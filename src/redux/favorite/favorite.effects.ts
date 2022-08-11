import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FavoriteBook, FavoriteChannel, FavoriteRoutes, FavoriteTvshow, FavoriteVideo } from '@models/core';
import { FavoriteService, TimeService } from '@services/core';

import * as favoriteActions from './favorite.action';
import { startLoading, stopLoading } from '../loading/loading.actions';

@Injectable()
export class FavoritesEffects {
  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.loadFavorites),
      switchMap(() => this.favoriteService.loadFavorites()),
      map((favoritesData) => favoriteActions.loadFavoritesSuccess({ favoritesData })),
      catchError((error: HttpErrorResponse) => of(favoriteActions.loadFavoritesError({ error })))
    )
  );

  addFavoriteChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.addFavoriteChannel),
      switchMap(({ id }) => this.favoriteService.addFavoriteContent(id, FavoriteRoutes.CHANNEL)),
      map((id) => {
        const added_time = this.timeService.currentTime;
        const channel: FavoriteChannel = {
          channel_id: id,
          added_time
        };
        return favoriteActions.addFavoriteChannelSuccess({ channel });
      }),
      catchError((error) => of(favoriteActions.addFavoriteChannelError({ error })))
    )
  );

  addFavoriteTvshow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.addFavoriteTvshow),
      switchMap(({ id }) => this.favoriteService.addFavoriteContent(id, FavoriteRoutes.TV_SHOW)),
      map((id) => {
        const added_time = this.timeService.currentTime;
        const tvshow: FavoriteTvshow = {
          tvshow_id: id,
          added_time
        };
        return favoriteActions.addFavoriteTvshowSuccess({ tvshow });
      }),
      catchError((error) => of(favoriteActions.addFavoriteTvshowError({ error })))
    )
  );

  addFavoriteVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.addFavoriteVideo),
      switchMap(({ id }) => this.favoriteService.addFavoriteContent(id, FavoriteRoutes.VIDEO)),
      map((id) => {
        const added_time = this.timeService.currentTime;
        const video: FavoriteVideo = {
          video_id: id,
          added_time
        };
        return favoriteActions.addFavoriteVideoSuccess({ video });
      }),
      catchError((error) => of(favoriteActions.addFavoriteVideoError({ error })))
    )
  );

  addFavoriteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.addFavoriteBook),
      switchMap(({ id }) => this.favoriteService.addFavoriteContent(id, FavoriteRoutes.BOOK)),
      map((id) => {
        const added_time = this.timeService.currentTime;
        const book: FavoriteBook = {
          litres_item_id: id,
          added_time
        };
        return favoriteActions.addFavoriteBookSuccess({ book });
      }),
      catchError((error) => of(favoriteActions.addFavoriteBookError({ error })))
    )
  );

  removeFavoriteChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.removeFavoriteChannel),
      switchMap(({ id }) => this.favoriteService.removeFavoriteContent(id, FavoriteRoutes.CHANNEL)),
      map((id) => favoriteActions.removeFavoriteChannelSuccess({ id })),
      catchError((error) => of(favoriteActions.removeFavoriteChannelError({ error })))
    )
  );

  removeFavoriteTvshow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.removeFavoriteTvshow),
      switchMap(({ id }) => this.favoriteService.removeFavoriteContent(id, FavoriteRoutes.TV_SHOW)),
      map((id) => favoriteActions.removeFavoriteTvshowSuccess({ id })),
      catchError((error) => of(favoriteActions.removeFavoriteTvshowError({ error })))
    )
  );

  removeFavoriteVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.removeFavoriteVideo),
      switchMap(({ id }) => this.favoriteService.removeFavoriteContent(id, FavoriteRoutes.TV_SHOW)),
      map((id) => favoriteActions.removeFavoriteVideoSuccess({ id })),
      catchError((error) => of(favoriteActions.removeFavoriteVideoError({ error })))
    )
  );

  removeFavoriteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteActions.removeFavoriteBook),
      switchMap(({ id }) => this.favoriteService.removeFavoriteContent(id, FavoriteRoutes.TV_SHOW)),
      map((id) => favoriteActions.removeFavoriteBookSuccess({ id })),
      catchError((error) => of(favoriteActions.removeFavoriteBookError({ error })))
    )
  );

  favoritesLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        favoriteActions.loadFavorites,
        favoriteActions.addFavoriteBook,
        favoriteActions.addFavoriteChannel,
        favoriteActions.addFavoriteTvshow,
        favoriteActions.addFavoriteVideo,
        favoriteActions.removeFavoriteChannel,
        favoriteActions.removeFavoriteTvshow,
        favoriteActions.removeFavoriteVideo,
        favoriteActions.removeFavoriteBook
      ),
      map(() => startLoading())
    )
  );

  favoritesLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        favoriteActions.loadFavoritesSuccess,
        favoriteActions.loadFavoritesError,
        favoriteActions.addFavoriteChannelSuccess,
        favoriteActions.addFavoriteChannelError,
        favoriteActions.addFavoriteBookSuccess,
        favoriteActions.addFavoriteBookError,
        favoriteActions.addFavoriteTvshowSuccess,
        favoriteActions.addFavoriteTvshowError,
        favoriteActions.addFavoriteVideoSuccess,
        favoriteActions.addFavoriteVideoError,
        favoriteActions.removeFavoriteChannelSuccess,
        favoriteActions.removeFavoriteChannelError,
        favoriteActions.removeFavoriteTvshowSuccess,
        favoriteActions.removeFavoriteTvshowError,
        favoriteActions.removeFavoriteVideoSuccess,
        favoriteActions.removeFavoriteVideoError,
        favoriteActions.removeFavoriteBookSuccess,
        favoriteActions.removeFavoriteBookError
      ),
      map(() => stopLoading())
    )
  );

  constructor(private actions$: Actions, private favoriteService: FavoriteService, private timeService: TimeService) {}
}
