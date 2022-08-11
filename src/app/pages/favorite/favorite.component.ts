import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { FavoriteBook, FavoriteVideo, FavoriteTvshow, Channel, Book } from '@models/core';
import { BackService, LitresService } from '@services/core';

import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  public favoriteChannels$: Observable<Channel[]>;
  public favoriteVideoIds$: Observable<FavoriteVideo[]>;
  public favoriteBookIds$: Observable<FavoriteBook[]>;
  public boughtBooks$: Observable<Book[]>;
  public favoriteTvshowIds$: Observable<FavoriteTvshow[]>;

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private backService: BackService,
    private litresService: LitresService,
    private channelsFacade: ChannelsFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit() {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe((_) => this.backService.goToMain());
    this.loadFavoriteChannels();
    this.loadFavoriteBooks();
    this.loadBoughtBooks();
    this.loadFavoriteVideos();
    this.loadFavoriteTvshows();
    this.focusOnFirst();
  }

  public backToMain(): void {
    this.router.navigate(['home']);
  }

  private loadFavoriteChannels(): void {
    this.favoriteChannels$ = combineLatest([
      this.channelsFacade.channels$,
      this.favoritesFacade.favoriteChannels$
    ]).pipe(
      map(([channels, favoriteChannelsData]) => {
        const favoriteChannels = channels.filter((channel) =>
          favoriteChannelsData.some((channelData) => channelData.channel_id === channel.channel_id)
        );
        return favoriteChannels;
      })
    );
  }

  private loadFavoriteBooks(): void {
    this.favoriteBookIds$ = this.favoritesFacade.favoriteBooks$;
  }

  private loadBoughtBooks(): void {
    this.boughtBooks$ = this.litresService.getUserBooks();
  }

  private loadFavoriteVideos(): void {
    this.favoriteVideoIds$ = this.favoritesFacade.favoriteVideos$;
  }

  private loadFavoriteTvshows(): void {
    this.favoriteTvshowIds$ = this.favoritesFacade.favoriteTvshows$;
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
