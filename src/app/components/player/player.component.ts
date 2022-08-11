import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ContentType, ContentName, Channel, PlayerEvents } from '@models/core';
import {
  AuthService,
  DataService,
  ImageService,
  TimeService,
  AdultService,
  PlayerControllerService
} from '@services/core';

import { environment } from './../../../environments/environment.prod';
import * as Hls from 'hls.js';
import * as NowPlaying from '../../../../platforms/android/plugins/cordova-plugin-nowplaying/www/NowPlaying.js';
import { AdultCheckState } from 'src/app/services/adult.service';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true })
  public video: ElementRef<HTMLVideoElement>;
  @ViewChild('player', { static: true })
  public playerElem: ElementRef<HTMLDivElement>;

  public isPlayerHaveError: boolean;
  public contentPoster: string;

  private hls: any;
  private player: HTMLVideoElement;
  private channels: Channel[] = [];

  private playerEventSubscriber: Subscription;

  private stateChangeHandler: any;
  private playHandler: any;
  private pauseHandler: any;
  private currentChannelId: number;

  private isListenersIsSet: boolean;

  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private imageService: ImageService,
    private timeService: TimeService,
    private channelsFacade: ChannelsFacade,
    private adultService: AdultService,
    private playerController: PlayerControllerService,
    private renderer: Renderer2,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.player = this.video.nativeElement;
    this.channelsFacade.channels$.pipe(takeUntil(this.destroy$)).subscribe((channels) => {
      this.channels = channels;
    });

    this.stateChangeHandler = this.onPlayerStateChange.bind(this);
    this.playHandler = this.onPlayerPlay.bind(this);
    this.pauseHandler = this.onPlayerPause.bind(this);

    this.playerController.actions.subscribe((event) => {
      switch (event.name) {
        case 'play':
          this.play(event.id, event.type, event.cover, event.stream);
          break;

        case 'pause':
          this.pause();
          break;

        case 'stop':
          this.stop();
          break;

        case 'updateChannelId':
          this.playChannel(event.id);
          break;

        case 'seek':
          this.seek(event.value);
          break;

        case 'resume':
          this.resume();
          break;

        case 'setFullscreen':
          this.setFullscreenMode();
          break;

        case 'setThumbnail':
          this.setThumbnailMode();
          break;

        default:
          break;
      }
    });
  }

  public get screenWidth(): string {
    const width = window.innerWidth;
    return width ? width + 'px' : '100%';
  }

  public get screenHeight(): string {
    const height = window.innerHeight;
    return height ? height + 'px' : '100%';
  }

  public get logo(): string {
    if (this.currentChannelId) {
      return this.imageService.getChannelLogo(this.currentChannelId);
    }
    return null;
  }

  private play(id: number | string, type: ContentType, cover?: string, stream?: string) {
    if (id.toString().length > 15) {
      type = ContentName.TV;
    }
    if (this.isAuthorized || type === ContentName.BOOK) {
      switch (type) {
        case ContentName.CHANNEL:
          if (this.currentChannelId !== +id) {
            this.currentChannelId = +id;
            this.playChannel(+id);
          }
          break;

        case ContentName.VIDEO:
          this.playVideo(+id);
          break;

        case ContentName.TV:
          this.playTvshow(id.toString());
          break;

        case ContentName.BOOK:
          this.playAudio(stream, cover);
          break;

        default:
          break;
      }
    } else {
      setTimeout(() => {
        this.currentChannelId = +id;
        this.contentPoster = this.imageService.getChannelFrame(+id, this.timeService.currentTime, 'scale', 1024, 768);
        this.isPlayerHaveError = true;
        this.playerController.events.next(PlayerEvents.PLAYER_ERROR_LOGIN);
      }, 0);
    }
  }

  private stop(clearPoster = true) {
    this.player.pause();
    if (this.hls) {
      this.hls.stopLoad();
      this.hls.detachMedia();
      this.destroyHls();
    }
    if (this.player) {
      this.player.removeAttribute('src');
    }
    this.currentChannelId = null;
  }

  private seek(value: number) {
    this.player.currentTime = value;
  }

  private resume(): void {
    this.player.play();
  }

  private pause(): void {
    this.playerController.events.next(PlayerEvents.PLAYER_PAUSE);
    if (this.player) {
      this.player.pause();
    }
  }

  private setFullscreenMode() {
    this.renderer.removeClass(this.playerElem.nativeElement, 'player_thumbnail');
    this.renderer.addClass(this.playerElem.nativeElement, 'player_fullscreen');
    this.renderer.removeClass(this.video.nativeElement, 'player-video_thumbnail');
  }

  private setThumbnailMode() {
    this.renderer.addClass(this.playerElem.nativeElement, 'player_thumbnail');
    this.renderer.removeClass(this.playerElem.nativeElement, 'player_fullscreen');
    this.renderer.addClass(this.video.nativeElement, 'player-video_thumbnail');
  }

  private destroyHls() {
    this.hls.destroy();
    this.hls = null;
  }

  private playAudio(stream: string, cover: string) {
    this.contentPoster = cover;
    this.playWithStandartHtml(stream);
  }

  private playChannel(id: number): void {
    this.contentPoster = this.imageService.getChannelFrame(+id, this.timeService.currentTime, 'scale', 1024, 768);
    this.loadingFacade.startLoading();
    this.dataService
      .getChannelStream(id)
      .pipe(finalize(() => this.loadingFacade.stopLoading()))
      .subscribe(
        ({ stream_url }) => {
          const channel = this.channels.find((ch) => ch.channel_id === id);
          if (channel.age_rating.includes('18')) {
            this.playAdultChannel(stream_url, channel);
          } else {
            this.playStream(channel, stream_url);
          }
        },
        (err) => this.errorHandling(err.status)
      );
  }

  private playAdultChannel(streamUrl: string, channel: Channel): void {
    this.playerController.events.next(PlayerEvents.PLAYER_ADULT_CONTENT);
    this.stop();
    if (this.playerEventSubscriber) {
      this.playerEventSubscriber.unsubscribe();
    }
    this.playerEventSubscriber = this.adultService.adultEvent.subscribe((response) => {
      switch (response) {
        case AdultCheckState.SUCCESS:
          this.playStream(channel, streamUrl);
          this.playerController.events.next(PlayerEvents.PLAYER_VALID_PIN);
          break;

        case AdultCheckState.CANCELED:
          this.playerController.events.next(PlayerEvents.PLAYER_VALID_PIN);
          break;
      }
    });
  }

  private playStream(channel: Channel, streamUrl: string): void {
    this.setNowPlayingForAndroid(channel, this.contentPoster);
    this.playUrl(streamUrl);
  }

  private setNowPlayingForAndroid(channel: Channel, poster: string): void {
    if (environment.platform === 'android') {
      NowPlaying.set({
        artwork: poster,
        albumTitle: channel.name,
        persistentID: channel.channel_id,
        playbackDuration: 500,
        title: channel.name
      });
    }
  }

  private playTvshow(id: string) {
    if (this.dataService.activeTvshow && this.dataService.activeTvshow.cover) {
      this.contentPoster = this.dataService.activeTvshow.cover;
    }
    this.loadingFacade.startLoading();
    this.dataService
      .getTvshowStream(id)
      .then((res) => this.playUrl(res.stream_url))
      .catch((err) => this.errorHandling(err.status))
      .finally(() => this.loadingFacade.stopLoading());
  }

  private errorHandling(statusCode: number): void {
    this.isPlayerHaveError = true;
    switch (statusCode) {
      case 500:
        this.playerController.events.next(PlayerEvents.PLAYER_ERROR_SERVER);
        break;

      case 403:
        this.playerController.events.next(PlayerEvents.PLAYER_ERROR_SUBSCRIPTION);
        break;
    }
  }

  private playVideo(id: number): void {
    this.contentPoster = this.dataService.activeVideo.cover;
    this.loadingFacade.startLoading();
    this.dataService
      .getVideoStream(id)
      .then((res) => this.playUrl(res.stream_url))
      .catch((err) => this.errorHandling(err.status))
      .finally(() => this.loadingFacade.stopLoading());
  }

  private parseStreamUrl(url: string): string {
    if (url.includes('https')) {
      return url;
    } else {
      if (url.includes('wowza2')) {
        return url;
      } else {
        let newUrl = url.replace('http', 'https');
        newUrl = newUrl.replace(':82', '');
        return newUrl;
      }
    }
  }

  private onPlayerStateChange(): void {
    this.playerController.events.next(PlayerEvents.PLAYER_READY);
  }

  private onPlayerPause(): void {
    this.playerController.events.next(PlayerEvents.PLAYER_PAUSE);
  }

  private onPlayerPlay(): void {
    this.playerController.events.next(PlayerEvents.PLAYER_PLAY);
  }

  private playUrl(url: string) {
    this.isPlayerHaveError = false;
    const parseUrl = this.parseStreamUrl(url);
    if (environment.platform === 'android' || environment.platform === 'web') {
      if (Hls.isSupported()) {
        this.playWithHls(parseUrl);
      } else {
        this.playWithStandartHtml(parseUrl);
      }
    } else {
      this.playWithStandartHtml(parseUrl);
    }
  }

  private playWithHls(url: string): void {
    if (!this.hls) {
      this.hls = new Hls();
      this.playerController.setInstance(this.player);
      this.player.addEventListener('loadedmetadata', this.stateChangeHandler);
      this.player.addEventListener('play', this.playHandler);
      this.player.addEventListener('pause', this.pauseHandler);

      this.hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              this.playerController.events.next(PlayerEvents.PLAYER_ERROR_SERVER);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              this.playerController.events.next(PlayerEvents.PLAYER_ERROR_MEDIA);
              break;
            default:
              break;
          }
        }
      });
    }
    this.hls.loadSource(url);
    this.hls.attachMedia(this.player);
    this.player.play();
  }

  private playWithStandartHtml(url: string): void {
    this.playerController.setInstance(this.player);
    this.stop(false);
    this.player.setAttribute('src', url);
    this.player.load();
    this.player.play();

    if (!this.isListenersIsSet) {
      this.isListenersIsSet = true;
      this.player.addEventListener('loadedmetadata', this.stateChangeHandler);
      this.player.addEventListener('play', this.playHandler);
      this.player.addEventListener('pause', this.pauseHandler);
      this.player.addEventListener('error', () => {
        if (this.player.error && this.player.error.message.length > 0) {
          this.playerController.events.next(PlayerEvents.PLAYER_ERROR_SERVER);
        }
      });
    }
  }

  private get isAuthorized(): boolean {
    return this.authService.isLogin;
  }

  ngOnDestroy() {
    if (this.playerEventSubscriber) {
      this.playerEventSubscriber.unsubscribe();
    }

    this.stop();
    this.player.removeEventListener('loadedmetadata', this.stateChangeHandler);
    this.player.removeEventListener('play', this.playHandler);
    this.player.removeEventListener('pause', this.pauseHandler);
  }
}
