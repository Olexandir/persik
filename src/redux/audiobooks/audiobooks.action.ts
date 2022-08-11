import { HttpErrorResponse } from "@angular/common/http";

import { createAction, props } from "@ngrx/store";

import { Book, LoadAudiobooksParams } from "@models/core";

export enum AUDIOBOOKS_ACTION {
  LOAD_AUDIOBOOKS = "[AUDIOBOOKS] LOAD AUDIOBOOKS",
  LOAD_AUDIOBOOKS_SUCCESS = "[AUDIOBOOKS] LOAD AUDIOBOOKS SUCCESS",
  LOAD_AUDIOBOOKS_ERROR = "[AUDIOBOOKS] LOAD AUDIOBOOKS ERROR",
  REFRESH_AUDIOBOOKS = "[AUDIOBOOKS] REFRESH",
}

export const loadAudiobooks = createAction(
  AUDIOBOOKS_ACTION.LOAD_AUDIOBOOKS,
  props<{ params: LoadAudiobooksParams }>()
);

export const loadAudiobooksSuccess = createAction(
  AUDIOBOOKS_ACTION.LOAD_AUDIOBOOKS_SUCCESS,
  props<{ audiobooks: Book[] }>()
);

export const loadAudiobooksError = createAction(
  AUDIOBOOKS_ACTION.LOAD_AUDIOBOOKS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const refreshAudiobooks = createAction(
  AUDIOBOOKS_ACTION.REFRESH_AUDIOBOOKS
);
