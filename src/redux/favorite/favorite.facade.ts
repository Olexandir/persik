import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ContentName } from '@models/core';

import {
  addFavoriteBook,
  addFavoriteChannel,
  addFavoriteTvshow,
  addFavoriteVideo,
  loadFavorites,
  removeFavoriteBook,
  removeFavoriteChannel,
  removeFavoriteTvshow,
  removeFavoriteVideo
} from './favorite.action';
import {
  selectFavoriteBook,
  selectFavoriteChannel,
  selectFavoriteTvshow,
  selectFavoriteVideo
} from './favorite.selectors';

import { FavoritesState } from './favorite.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavoritesFacade {
  public favoriteChannels$ = this.store.select(selectFavoriteChannel);
  public favoriteTvshows$ = this.store.select(selectFavoriteTvshow);
  public favoriteVideos$ = this.store.select(selectFavoriteVideo);
  public favoriteBooks$ = this.store.select(selectFavoriteBook);

  constructor(private store: Store<FavoritesState>) {}

  public loadFavoritesData(): void {
    this.store.dispatch(loadFavorites());
  }

  public addFavoriteContent(contentId: string | number, type: ContentName): void {
    switch (type) {
      case ContentName.CHANNEL:
        this.store.dispatch(addFavoriteChannel({ id: +contentId }));
        break;
      case ContentName.TV:
        this.store.dispatch(addFavoriteTvshow({ id: contentId.toString() }));
        break;
      case ContentName.VIDEO:
        this.store.dispatch(addFavoriteVideo({ id: +contentId }));
        break;
      case ContentName.BOOK:
        this.store.dispatch(addFavoriteBook({ id: +contentId }));
        break;
    }
  }

  public removeFavoriteContent(contentId: string | number, type: ContentName): void {
    switch (type) {
      case ContentName.CHANNEL:
        this.store.dispatch(removeFavoriteChannel({ id: +contentId }));
        break;
      case ContentName.TV:
        this.store.dispatch(removeFavoriteTvshow({ id: contentId.toString() }));
        break;
      case ContentName.VIDEO:
        this.store.dispatch(removeFavoriteVideo({ id: +contentId }));
        break;
      case ContentName.BOOK:
        this.store.dispatch(removeFavoriteBook({ id: +contentId }));
        break;
    }
  }

  public checkContentForFavorite(id: number | string, type: ContentName): Observable<boolean> {
    switch (type) {
      case ContentName.CHANNEL:
        return this.favoriteChannels$.pipe(
          map((favoriteChannels) => favoriteChannels.some((channel) => channel.channel_id === id))
        );
      case ContentName.TV:
        return this.favoriteTvshows$.pipe(
          map((favoriteTvshows) => favoriteTvshows.some((tvshow) => tvshow.tvshow_id === id))
        );
      case ContentName.VIDEO:
        return this.favoriteVideos$.pipe(
          map((favoriteVideos) => favoriteVideos.some((video) => video.video_id === id))
        );
      case ContentName.BOOK:
        return this.favoriteBooks$.pipe(
          map((favoriteBooks) => favoriteBooks.some((book) => book.litres_item_id === id))
        );
    }
  }
}
