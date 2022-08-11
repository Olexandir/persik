import { LoadingFacade } from './../../../redux/loading/loading.facade';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { forkJoin, of, Subscription, Subject } from 'rxjs';
import { filter, finalize, mergeMap, tap, takeUntil } from 'rxjs/operators';

import {
  ContentType,
  ContentName,
  PlayerVideoInfo,
  PlayerEvents,
} from '@models/core';
import {
  MenuControlService,
  BackService,
  DataService,
  TimeService,
  PositionMemoryService,
  PlayerControllerService,
  LitresService
} from '@services/core';

import { Position } from 'src/app/services/position-memory.service';
import { KeyMap } from '../../../keymaps/keymap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerPageComponent implements OnInit, OnDestroy {
  public duration = 0;
  public trackTime = 0;
  public seekPosition = 0;
  public isShowControls: boolean;
  public videoInfo: PlayerVideoInfo = {
    type: ContentName.CHANNEL,
    name: '',
    casts: [],
    genres: [],
  };

  public isPaused: boolean;

  public isHaveInMemory: boolean;
  public lastTime: number;
  public isCourse: boolean;

  private isSeekingEnabled: boolean;
  private keydownEventHandler: any;
  private hideControlsTimer: any;
  private contentId: string | number;
  private type: ContentType;
  private destroy$ = new Subject();

  private seekStep = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuController: MenuControlService,
    private backService: BackService,
    private timeService: TimeService,
    private dataService: DataService,
    private location: Location,
    private positionMemory: PositionMemoryService,
    private loadingFacade: LoadingFacade,
    private playerController: PlayerControllerService,
    private litresService: LitresService
  ) { }

  ngOnInit() {
    this.menuController.hideMenu();
    this.positionMemory.clearPositions();
    const params = this.activatedRoute.snapshot.params;

    const lastPosition =
      environment.platform === 'lg' || this.type === ContentName.BOOK
        ? null
        : this.positionMemory.getPosition(params.id);
    this.contentId = params.id;
    this.type = params.type;

    let queryParams: any;

    if (this.type === ContentName.BOOK) {
      queryParams = this.activatedRoute.snapshot.queryParams;
    }

    if (lastPosition) {
      // если в памяти есть инфо о времени окончания просмотра контента
      setTimeout(() => {
        this.isHaveInMemory = true;
        this.lastTime = lastPosition;
      }, 200);
    } else {
      const cover = queryParams ? queryParams.cover : null;
      const stream = queryParams ? queryParams.stream : null;
      this.playerController.play(this.contentId, this.type, cover, stream);
    }
    this.loadInfo(this.contentId, this.type);

    this.playerController.events.pipe(takeUntil(this.destroy$)).subscribe(
      (event) => {
        switch (event) {
          case PlayerEvents.PLAYER_READY:
            this.onPlayerReady();
            this.autoHideControls();
            break;

          case PlayerEvents.PLAYER_PAUSE:
            this.isPaused = true;
            this.isShowControls = true;
            clearTimeout(this.hideControlsTimer);
            break;

          case PlayerEvents.PLAYER_PLAY:
            this.isPaused = false;
            this.autoHideControls();
            break;

          default:
            break;
        }
      }
    );

    this.keydownEventHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keydownEventHandler);

    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      this.location.back();
    });
  }

  public onResume(isresume: boolean): void {
    this.playerController.play(this.contentId, this.type);
    if (isresume) {
      setTimeout(() => {
        this.playerController.seek(Math.round(this.lastTime));
      }, 1000);
    }
    this.isHaveInMemory = false;
  }

  public seekByCursor(seekTime: number): void {
    this.playerController.pause();
    this.autoHideControls();
    this.isSeekingEnabled = true;
    this.seekPosition = seekTime;
    this.seekActivate();
  }

  private loadInfo(id: number | string, type: ContentType): void {
    if (id.toString().length > 15) {
      type = ContentName.TV;
    }
    this.loadingFacade.startLoading();

    switch (type) {
      case ContentName.VIDEO:
        this.dataService.getVideoInfo(id)
          .pipe(filter(res => !!res), finalize(() => this.loadingFacade.stopLoading()))
          .subscribe(({ category_id, name, cast }) => {
            this.isCourse = category_id === 6;
            const videoId = Number(id);
            this.videoInfo = { ...this.videoInfo, videoId, type, name };
            if (cast.length > 0) {
              this.loadCasts(cast);
            }
          });
        break;

      case ContentName.TV:
        this.dataService.getTvshowInfo(id)
          .pipe(
            mergeMap((tvshow) => forkJoin([of(tvshow), this.dataService.getVideoInfo(tvshow.video_id)])),
            filter(([tvshow, videoInfo]) => !!(tvshow && tvshow.video_id && videoInfo)),
            finalize(() => this.loadingFacade.stopLoading())
          )
          .subscribe(([tvshow, videoInfo]) => {
            const { category_id, name, cast } = videoInfo;
            const { channel_id, start } = tvshow;
            const videoId = Number(id);
            this.isCourse = category_id === 6;
            this.videoInfo = { ...this.videoInfo, videoId, type, name, channelId: channel_id, start };
            if (cast.length > 0) {
              this.loadCasts(cast);
            }
          });
        break;

      case ContentName.BOOK:
        this.litresService.getBooksInfo([+id])
          .pipe(finalize(() => this.loadingFacade.stopLoading()))
          .subscribe((data) => (this.videoInfo.name = data[0].title));
        break;

      default:
        break;
    }
  }

  private loadCasts(castIds: number[]): void {
    this.dataService.loadActors(castIds)
      .subscribe((res) => (this.videoInfo.casts = res.map((cast) => cast.name)));
  }

  public autoHideControls(): void {
    this.isShowControls = true;
    clearTimeout(this.hideControlsTimer);
    this.hideControlsTimer = setTimeout(() => {
      this.isShowControls = false;
      if (this.isSeekingEnabled) {
        this.isSeekingEnabled = false;
      }
    }, 5000);
  }

  private onKeyDown(event: KeyboardEvent): void {
    this.autoHideControls();
    const code = event.keyCode;
    switch (code) {
      case KeyMap.RIGHT:
        this.seekRight();
        break;

      case KeyMap.LEFT:
        this.seekLeft();
        break;

      case KeyMap.ENTER:
        if (this.isSeekingEnabled) {
          this.seekActivate();
        } else {
          if (this.isPaused) {
            this.playerController.resume();
          } else {
            this.playerController.pause();
          }
        }
        break;

      case KeyMap.PAUSE:
        if (!this.isPaused) {
          this.playerController.pause();
          this.isPaused = true;
        }
        break;

      case KeyMap.STOP:
        this.location.back();
        break;

      case KeyMap.PLAY:
        if (this.isPaused) {
          this.playerController.resume();
        }
        break;

      case KeyMap.PLAY_PAUSE:
        if (this.isSeekingEnabled) {
          this.seekActivate();
        } else {
          if (this.isPaused) {
            this.playerController.resume();
          } else {
            this.playerController.pause();
          }
        }
        break;

      case KeyMap.RWD:
        this.seekLeft();
        break;

      case KeyMap.FWD:
        this.seekRight();
        break;

      /* case KeyMap.BACK:
        this.location.back();
        break; */

      default:
        break;
    }
  }

  private onPlayerReady(): void {
    this.duration = this.playerController.duration;
    this.calculateSeekStep();
    this.timeService.timeControllerFast.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.trackTime = this.playerController.currentTime;
        if (!this.isSeekingEnabled) {
          this.seekPosition = this.trackTime;
        }
        if (this.trackTime >= this.duration) {
          this.location.back();
        }
      }
    );
  }

  private calculateSeekStep(): void {
    const ethalonDuration = 5400; // sec
    this.seekStep = Math.round((this.duration / ethalonDuration) * 60);
  }

  /* private onPlayerPause(): void {
    if (this.timeServiceSubscriber) {
      this.timeServiceSubscriber.unsubscribe();
    }
  } */

  private seekRight(): void {
    this.autoHideControls();
    if (this.seekPosition + this.seekStep < this.duration) {
      this.isSeekingEnabled = true;
      this.seekPosition += this.seekStep;
    }
  }

  private seekLeft(): void {
    this.autoHideControls();
    if (this.seekPosition - this.seekStep > 0) {
      this.isSeekingEnabled = true;
      this.seekPosition -= this.seekStep;
    }
  }

  private seekActivate(): void {
    this.loadingFacade.startLoading();
    this.playerController.pause();
    this.playerController.seek(this.seekPosition);
    this.trackTime = this.seekPosition;
    this.playerController.resume();
    this.isSeekingEnabled = false;
    setTimeout(() => {
      this.loadingFacade.stopLoading();
    }, 1000);
  }

  private setMemoryPosition(): void {
    if (this.duration - this.trackTime > 300) {
      const position: Position = {
        contentId: this.contentId,
        time: this.trackTime,
      };
      this.positionMemory.setPosition(position);
    } else {
      this.positionMemory.removePosition(this.contentId);
    }
  }

  ngOnDestroy() {
    if (environment.platform !== 'lg' || this.type !== ContentName.BOOK) {
      this.setMemoryPosition();
    }
    this.playerController.stop();
    this.destroy$.next();
    this.destroy$.complete();

    document.removeEventListener('keydown', this.keydownEventHandler);
    this.menuController.showMenu();
    this.loadingFacade.stopLoading();
  }
}
