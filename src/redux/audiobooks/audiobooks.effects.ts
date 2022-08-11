import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LitresService } from '@services/core';

import { startLoading, stopLoading } from './../loading/loading.actions';
import {
  loadAudiobooks,
  loadAudiobooksError,
  loadAudiobooksSuccess
} from './audiobooks.action';

@Injectable()
export class AudiobooksEffects {
  loadAudiobooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAudiobooks),
      switchMap(({ params }) => this.litresService.getList(params)),
      map((audiobooks) => loadAudiobooksSuccess({ audiobooks })),
      catchError((error: HttpErrorResponse) =>
        of(loadAudiobooksError({ error }))
      )
    )
  );

  audiobooksLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAudiobooks),
      map(() => startLoading())
    )
  );

  audiobooksLoaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAudiobooksSuccess, loadAudiobooksError),
      map(() => stopLoading())
    )
  );

  constructor(
    private actions$: Actions,
    private litresService: LitresService
  ) {}
}
