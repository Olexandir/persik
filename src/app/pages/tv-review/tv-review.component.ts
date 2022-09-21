import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { BackService } from './../../services/back.service';
import { AuthService, TimeService } from '@services/core';
import { Genre, Channel } from '@models/core';
import { STUB_GENRE } from '../../constants/stub-genre';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { DEFAULT_COUNT, STEP } from './constants/channels-pagination';

@Component({
  selector: 'app-tv-review',
  templateUrl: './tv-review.component.html',
  styleUrls: ['./tv-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvReviewPageComponent implements OnInit, OnDestroy {
  @Output()
  public openAuthModalChange = new EventEmitter<boolean>();

  public genres: Genre[] = [];
  public chosenCategory = 0;
  public isAuthorized: boolean;

  public currentTime: number;
  public activeGenre: Genre;
  public channelList: Observable<Channel[]>;
  public channelsLoader$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public isShowPreloadArea = true;

  private currentCount = DEFAULT_COUNT;
  private destroy$ = new Subject();

  constructor(
    private authService: AuthService,
    private timeService: TimeService,
    private backService: BackService,
    private activatedRoute: ActivatedRoute,
    private channelsFacade: ChannelsFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startSubscriptions();
    this.channelList = this.getChannels();
    this.currentTime = this.timeService.currentTime;
    this.authService.loginStateEvent.subscribe((isAuth) => {
      this.isAuthorized = isAuth;
      this.cdr.detectChanges();
    });
    this.authService.getAccountInfo().subscribe((user) => {
      this.isAuthorized = !!user;
      this.cdr.detectChanges();
    });
  }

  public openAuthModal(event: boolean): void {
    this.openAuthModalChange.emit(event);
  }

  public filterChannelsByCategory(categoryId: number): void {
    this.chosenCategory = categoryId;
    // if (categoryId === 0) return;
  }

  public loadMoreChannels(): void {
    this.currentCount += STEP;
    this.channelsLoader$.next(false);
  }

  public trackByChannelId(channel: Channel): number {
    return channel.channel_id;
  }

  private startSubscriptions(): void {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe((_) => {
      this.backService.goToMain();
    });
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.changeGenre(params.genre);
    });
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

  private getChannels(): Observable<Channel[]> {
    // return this.channelsFacade.channels$.pipe(
    //   takeUntil(this.destroy$),
    //   map((channels) => {
    //     const filteredChannels = this.filterChannelsByGenre(channels, this.activeGenre);
    //     const slicedChannels = filteredChannels.slice(0, this.currentCount);
    //     return slicedChannels;
    //   })
    // );
    return combineLatest([this.channelsFacade.channels$, this.channelsLoader$]).pipe(
      map(([channels, isReload]) => {
        // const filteredChannels = this.filterChannelsByGenre(channels, this.activeGenre);
        // const slicedChannels = filteredChannels.slice(0, this.currentCount);
        return channels;
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

  // private focusOnFirst(): void {
  //   setTimeout(() => {
  //     const elem: HTMLElement = document.querySelector('.page [nav-group]');
  //     if (elem) {
  //       elem.focus();
  //     }
  //   }, 100);
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
