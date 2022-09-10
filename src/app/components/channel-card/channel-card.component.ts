import { OpenCloseAuthModalService } from './../../services/open-close-auth-modal.service';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { STUB_TVSHOW } from '@constants/core';
import { Tvshow, Channel } from '@models/core';
import { ImageService } from '@services/core';

import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelCardComponent implements OnInit {
  @Input()
  public canOpenChannel: boolean;
  @Input()
  public currentTime: number;
  @Input()
  public isLast: boolean;
  @Input()
  public isStub: boolean;
  @Input()
  public channel: Channel;

  @Output()
  public showAllEvent = new EventEmitter<any>();
  @Output()
  public openAuthModalChange = new EventEmitter<boolean>();

  public cover: string;
  public isShow: boolean;
  public tvshow$: Observable<Tvshow>;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private channelsFacade: ChannelsFacade,
    private openCloseService: OpenCloseAuthModalService
  ) {}

  ngOnInit(): void {
    if (!this.isLast && !this.isStub) {
      this.resetChannelState();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.channel && changes.channel.currentValue !== changes.channel.previousValue) {
      this.resetChannelState();
    }
  }

  private resetChannelState(): void {
    this.cover = this.imageService.getChannelFrame(this.channel.channel_id, this.currentTime);
    this.tvshow$ = this.getChannelTvshow();
  }

  public playChannel(): void {
    if (this.canOpenChannel) {
      this.router.navigate(['channel-player', this.channel.channel_id]);
    } else {
      this.openCloseService.openAuthModal();
    }
  }

  public showAll(): void {
    this.showAllEvent.emit();
  }

  private getChannelTvshow(): Observable<Tvshow> {
    return this.channelsFacade.tvshows$.pipe(
      map((tvshows) => {
        const currentTvshow = tvshows.find((tvshow) => tvshow.channel_id === this.channel.channel_id);
        return currentTvshow || STUB_TVSHOW;
      })
    );
  }
}
