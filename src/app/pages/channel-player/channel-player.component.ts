import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { PlayerEvents, ContentName, Tvshow, Channel } from '@models/core';
import { MenuControlService, BackService, TimeService } from '@services/core';

import { ChannelTapeItemComponent } from './channel-tape/channel-tape-item/channel-tape-item.component';
import { digitsMap } from 'src/keymaps/keymap';
import { PlayerControllerService } from 'src/app/services/player-controller.service';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-channel-player',
  templateUrl: './channel-player.component.html',
  styleUrls: ['./channel-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelPlayerComponent implements OnInit, OnDestroy {
  public isHideControls: boolean;
  public isDestroyControls: boolean;
  public isShowCheckPin: boolean;
  public currentTvshow$: Observable<Tvshow>;
  public currentTime: number;
  public channelSelectorField = '';
  public channels$: Observable<Channel[]>;

  private channelSelectorTimer: any;
  private channelId: number;
  private autoHideTimer: any;
  private anyKeyEventHandler: any;
  private freezeControlTimer: any;
  private timerSubscription: Subscription;
  private previousTimeStamp: number;
  private readonly freezControlTime = 10000; // milliseconds

  private destroy$ = new Subject();

  private CODE_DIGITS: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuControlService,
    private timeService: TimeService,
    private backService: BackService,
    private location: Location,
    private playerController: PlayerControllerService,
    private channelsFacade: ChannelsFacade,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.menuCtrl.hideMenu();
    this.currentTime = this.timeService.currentTime;
    const id = Number(this.activatedRoute.snapshot.params.id);
    ChannelTapeItemComponent.activeChannelId = id;
    this.channelId = id;
    this.channelsFacade.loadActiveTvshow(id);
    this.currentTvshow$ = this.channelsFacade.activeTvshow$;
    this.playerController.play(id, ContentName.CHANNEL);
    this.autoHideControls();

    this.anyKeyEventHandler = this.showControls.bind(this);
    document.addEventListener('keydown', this.anyKeyEventHandler);
    this.channels$ = this.channelsFacade.channels$;

    this.playerEventsSubscribe();

    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      this.location.back();
    });
    this.CODE_DIGITS = digitsMap;
  }

  private freezeControl(): void {
    clearTimeout(this.freezeControlTimer);
    this.freezeControlTimer = setTimeout(() => {
      this.playerController.stop();
      this.playerController.play(this.channelId, ContentName.CHANNEL);
    }, this.freezControlTime);
  }

  private showControls(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (this.CODE_DIGITS.includes(keyCode)) {
      this.channelDigitSelectorShow(keyCode);
    }
    this.autoHideControls();
  }

  private channelDigitSelectorShow(code: number): void {
    this.channelSelectorField += this.CODE_DIGITS.indexOf(code);
    if (this.channelSelectorField.length < 3) {
      clearTimeout(this.channelSelectorTimer);
      this.channelSelectorTimer = setTimeout(() => {
        this.changeChannelBySelector();
      }, 2000);
    } else {
      clearTimeout(this.channelSelectorTimer);
      setTimeout(() => {
        this.changeChannelBySelector();
      }, 200);
    }
  }

  private changeChannelBySelector(): void {
    const chId = this.getChannelId(this.channelSelectorField);
    if (chId) {
      this.channelChange(chId);
    }
    this.channelSelectorField = '';
  }

  private get channelsLength(): number {
    let length = 0;
    this.channelsFacade.channels$.pipe(take(1)).subscribe((data) => {
      console.log(data);
      length = data.length;
    });
    return length;
  }

  private getChannelId(chNumber: string): number {
    const channelNumber = Number(chNumber);
    if (channelNumber !== 0 && this.channelsLength >= channelNumber) {
      let id = null;
      this.channels$.pipe(take(1)).subscribe((channels) => (id = channels[channelNumber - 1].channel_id));
      return id;
    }
    return null;
  }

  public get isHaveChannelNumber(): boolean {
    return this.channelSelectorField.length > 0;
  }

  public autoHideControls(): void {
    this.isHideControls = false;
    clearTimeout(this.autoHideTimer);
    this.autoHideTimer = setTimeout(() => {
      this.isHideControls = true;
      this.cd.markForCheck();
    }, 4000);
  }

  public channelChange(id: number): void {
    if (ChannelTapeItemComponent.activeChannelId !== id) {
      this.channelId = id;
      this.playerController.updateChannelId(id);
      ChannelTapeItemComponent.activeChannelId = id;
      this.channelsFacade.loadActiveTvshow(id);
    }
  }

  private playerEventsSubscribe(): void {
    this.playerController.events.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      switch (res) {
        case PlayerEvents.PLAYER_ERROR_LOGIN:
          document.removeEventListener('keydown', this.anyKeyEventHandler);
          this.isDestroyControls = true;
          break;

        case PlayerEvents.PLAYER_ERROR_SUBSCRIPTION:
          document.removeEventListener('keydown', this.anyKeyEventHandler);
          this.isDestroyControls = true;
          break;

        case PlayerEvents.PLAYER_ADULT_CONTENT:
          document.removeEventListener('keydown', this.anyKeyEventHandler);
          this.isDestroyControls = true;
          this.isShowCheckPin = true;
          break;

        case PlayerEvents.PLAYER_VALID_PIN:
          this.anyKeyEventHandler = this.showControls.bind(this);
          document.addEventListener('keydown', this.anyKeyEventHandler);
          this.isDestroyControls = false;
          this.isShowCheckPin = false;
          break;
        case PlayerEvents.PLAYER_PAUSE:
          clearTimeout(this.freezeControlTimer);
          break;
        case PlayerEvents.PLAYER_READY:
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
          }
          clearTimeout(this.freezeControlTimer);
          this.timerSubscription = this.timeService.timeControllerFast.subscribe((currentTime) => {
            if (this.previousTimeStamp !== this.playerController.currentTime) {
              this.previousTimeStamp = this.playerController.currentTime;
              this.freezeControl();
              this.currentTime = currentTime;
            }
          });
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.playerController.stop();
    this.menuCtrl.showMenu();
    this.isDestroyControls = false;
    this.isShowCheckPin = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      clearTimeout(this.freezeControlTimer);
    }
    clearTimeout(this.freezeControlTimer);
    document.removeEventListener('keydown', this.anyKeyEventHandler);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
