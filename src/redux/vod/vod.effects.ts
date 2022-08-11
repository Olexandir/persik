import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as vodActions from './vod.action';
import { startLoading, stopLoading } from '../loading/loading.actions';
import { DataService } from '@services/core';

@Injectable()
export class VodEffects {
  loadVodCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vodActions.loadVodCategories),
      switchMap(() => this.dataService.loadVodCategories()),
      map((categories) => vodActions.loadVodCategoriesSuccess({ categories })),
      catchError((error) => of(vodActions.loadVodCategoriesError({ error })))
    )
  );

  vodLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vodActions.loadVodCategories),
      map(() => startLoading())
    )
  );

  vodLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vodActions.loadVodCategoriesSuccess, vodActions.loadVodCategoriesError),
      map(() => stopLoading())
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
