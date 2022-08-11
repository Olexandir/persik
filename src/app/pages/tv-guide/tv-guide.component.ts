import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, of } from 'rxjs';
import { finalize, takeUntil, tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { BackService, PlayerControllerService, PositionMemoryService, DataService } from '@services/core';

import { Genre, Channel, Tvshow } from '@models/core';

import { ChannelsState } from '../../../redux/channels/channels.state';
import { STUB_GENRE } from 'src/app/constants/stub-genre';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-tv-guide',
  templateUrl: './tv-guide.component.html',
  styleUrls: ['./tv-guide.component.scss']
})
export class TvGuideComponent implements OnInit, OnDestroy {
  public currentDate: string;
  public activeChannel: Channel;
  public dvr = 0;
  public activeGenre: Genre;

  public selectedTvshow$: Observable<Tvshow>;
  public allTvshows$: Observable<Tvshow[]>;
  public filteredChannels$: Observable<Channel[]>;

  private destroy$ = new Subject();

  constructor(
    private channelsStore: Store<ChannelsState>,
    private channelsFacade: ChannelsFacade,
    private dataService: DataService,
    private backService: BackService,
    private playerController: PlayerControllerService,
    private memoryService: PositionMemoryService,
    private activatedRoute: ActivatedRoute,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.playerController.stop();
      this.backService.goToMain();
    });

    this.currentDate = moment().format('YYYY-MM-DD');

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.genre) {
        this.activeGenre = JSON.parse(params.genre);
      } else {
        this.activeGenre = STUB_GENRE;
      }
      this.onGenreChange();
    });
  }

  public onGenreChange(): void {
    this.filteredChannels$ = this.channelsFacade.channels$.pipe(
      map((channels) => {
        const id = this.activeGenre.id;
        return this.filterChannels(channels, id);
      }),
      tap((channels) => this.changeActiveChannel(channels))
    );
  }

  public redirectFocus(): void {
    this.focusOnFirst();
  }

  public onChannelChange(channel: Channel): void {
    this.dvr = channel.dvr_sec;
    this.memoryService.currentChannel = channel;
    this.activeChannel = channel;
    const channelId = channel.channel_id;

    this.loadingFacade.startLoading();
    this.allTvshows$ = this.dataService.getTvshows(channelId).pipe(
      tap(() => {
        this.onDateChange(moment().format('YYYY-MM-DD'));
        this.checkFocus();
      }),
      finalize(() => this.loadingFacade.stopLoading())
    );

    this.loadingFacade.startLoading();
    this.selectedTvshow$ = this.dataService.loadTvshowsByIds([channel.channel_id]).pipe(
      map((tvshows) => tvshows[0]),
      finalize(() => this.loadingFacade.stopLoading())
    );
  }

  public onDateChange(date: string): void {
    this.currentDate = date;
  }

  public onTvshowFocus(tvshow: Tvshow): void {
    this.selectedTvshow$ = of(tvshow);
  }

  private filterChannels(channels: Channel[], id: number): Channel[] {
    if (id !== 0) {
      return channels.filter((channel) => channel.genres.includes(id));
    }
    return channels;
  }

  private changeActiveChannel(channels: Channel[]): void {
    this.activeChannel = channels[0];

    if (channels.length) {
      this.onChannelChange(this.activeChannel);
      this.focusOnFirst();
    }
  }

  private checkFocus(): void {
    setTimeout(() => {
      const body = document.body;
      const focusedItem = document.activeElement;
      if (focusedItem === body) {
        const currentTvshow = document.querySelector('.active') as HTMLElement;
        if (currentTvshow) {
          currentTvshow.focus();
        }
      }
    }, 200);
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 500);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
