import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { BackService } from './../../services/back.service';
import { TimeService } from '@services/core';
import { Genre, Channel } from '@models/core';
import { STUB_GENRE } from '../../constants/stub-genre';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { DEFAULT_COUNT, STEP } from './constants/channels-pagination';

@Component({
  selector: 'app-tv-review',
  templateUrl: './tv-review.component.html',
  styleUrls: ['./tv-review.component.scss']
})
export class TvReviewPageComponent implements OnInit, OnDestroy {
  public genres: Genre[] = [];

  private currentCount = DEFAULT_COUNT;
  public currentTime: number;
  public activeGenre: Genre;
  public channelsByRows$: Observable<Channel[][]>;
  public channelsLoader$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public isShowPreloadArea = true;

  private destroy$ = new Subject();

  constructor(
    private timeService: TimeService,
    private backService: BackService,
    private activatedRoute: ActivatedRoute,
    private channelsFacade: ChannelsFacade
  ) {}

  ngOnInit(): void {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      this.backService.goToMain();
    });
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.changeGenre(params.genre);
    });
    this.channelsByRows$ = this.getChannels();

    this.currentTime = this.timeService.currentTime;
  }

  public loadMoreChannels(): void {
    this.currentCount += STEP;
    this.channelsLoader$.next(false);
  }

  public trackByRowIds(ind: number): number {
    return ind;
  }

  public trackByChannelId(ind: number, channel: Channel): number {
    return channel.channel_id;
  }

  private changeGenre(genre: string): void {
    if (genre) {
      const activeGenre = JSON.parse(genre);
      this.activeGenre = activeGenre;
    } else {
      this.activeGenre = STUB_GENRE;
    }
    this.currentCount = DEFAULT_COUNT;
    this.channelsLoader$.next(true);
  }

  private getChannels(): Observable<Channel[][]> {
    return combineLatest([this.channelsFacade.channels$, this.channelsLoader$]).pipe(
      map(([channels, isReload]) => {
        const filteredChannels = this.filterChannelsByGenre(channels, this.activeGenre);
        const slicedChannels = filteredChannels.slice(0, this.currentCount);
        const channelsByRows = this.buildChannelRows(slicedChannels);
        if (isReload) {
          this.focusOnFirst();
        }
        return channelsByRows;
      })
    );
  }

  private filterChannelsByGenre(channels: Channel[], desiredGenre: Genre): Channel[] {
    if (desiredGenre.id === 0) {
      return channels;
    }
    const filteredChannels = channels.filter((channel) =>
      channel.genres.some((genreId) => genreId === desiredGenre.id)
    );
    return filteredChannels;
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 100);
  }

  private buildChannelRows(channels: Channel[]): Channel[][] {
    return channels.reduce((channelsByRows, channel, ind) => {
      if (ind % 4 === 0) {
        channelsByRows.push([]);
      }
      channelsByRows[channelsByRows.length - 1].push(channel);
      return channelsByRows;
    }, [] as Channel[][]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
