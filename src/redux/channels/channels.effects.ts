import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DataService } from '@services/core';

import * as channelActions from './channels.action';

import { startLoading, stopLoading } from '../loading/loading.actions';

@Injectable()
export class ChannelsEffects {
  loadChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadChannels),
      switchMap(() => this.dataService.loadChannels()),
      map((channels) => channelActions.loadChannelsSuccess({ channels })),
      catchError((error: HttpErrorResponse) => of(channelActions.loadChannelsError({ error })))
    )
  );

  loadChannelCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadChannelCategories),
      switchMap(() => this.dataService.loadChannelCategories()),
      map((categories) => channelActions.loadChannelCategoriesSuccess({ categories })),
      catchError((error) => of(channelActions.loadChannelCategoriesError({ error })))
    )
  );

  loadTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadTvshows),
      switchMap(({ channelIds }) => this.dataService.loadTvshowsByIds(channelIds)),
      map((tvshows) => channelActions.loadTvshowsSuccess({ tvshows })),
      catchError((error) => of(channelActions.loadTvshowsError({ error })))
    )
  );

  loadChannelsTvshows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadChannelsSuccess),
      map(({ channels }) => {
        const channelIds = channels.map((channel) => channel.channel_id);
        return channelActions.loadTvshows({ channelIds });
      })
    )
  );

  loadActiveTvshow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadActiveTvshow),
      switchMap(({ channelId }) => this.dataService.loadTvshowsByIds([channelId])),
      map((tvshows) => channelActions.loadActiveTvshowSuccess({ tvshow: tvshows[0] })),
      catchError((error) => of(channelActions.loadActiveTvshowError({ error })))
    )
  );

  loading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(channelActions.loadChannels, channelActions.loadTvshows, channelActions.loadActiveTvshow),
      map(() => startLoading())
    )
  );

  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        channelActions.loadChannelsSuccess,
        channelActions.loadChannelsError,
        channelActions.loadTvshowsSuccess,
        channelActions.loadTvshowsError,
        channelActions.loadActiveTvshowSuccess,
        channelActions.loadActiveTvshowError
      ),
      map(() => stopLoading())
    )
  );
  constructor(private actions$: Actions, private dataService: DataService) {}
}
