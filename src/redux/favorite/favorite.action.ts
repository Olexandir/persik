import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { FavoriteChannel, FavoriteVideo, FavoriteTvshow, FavoriteBook, FavoritesData } from '@models/core';

export enum FAVORITE_ACTION {
  LOAD_FAVORITES = '[FAVORITE] LOAD FAVORITES',
  LOAD_FAVORITES_SUCCESS = '[FAVORITE] LOAD FAVORITES SUCCESS',
  LOAD_FAVORITES_ERROR = '[FAVORITE] LOAD FAVORITE ERROR',

  ADD_FAVORITE_CHANNEL = '[FAVORITE] ADD FAVORITE CHANNEL',
  ADD_FAVORITE_CHANNEL_SUCCESS = '[FAVORITE] ADD FAVORITE CHANNEL SUCCESS',
  ADD_FAVORITE_CHANNEL_ERROR = '[FAVORITE] ADD FAVORITE CHANNEL ERROR',

  ADD_FAVORITE_VIDEO = '[FAVORITE] ADD FAVORITE VIDEO',
  ADD_FAVORITE_VIDEO_SUCCESS = '[FAVORITE] ADD FAVORITE VIDEO SUCCESS',
  ADD_FAVORITE_VIDEO_ERROR = '[FAVORITE] ADD FAVORITE VIDEO ERROR',

  ADD_FAVORITE_TVSHOW = '[FAVORITE] ADD FAVORITE TVSHOW',
  ADD_FAVORITE_TVSHOW_SUCCESS = '[FAVORITE] ADD FAVORITE TVSHOW SUCCESS',
  ADD_FAVORITE_TVSHOW_ERROR = '[FAVORITE] ADD FAVORITE TVSHOW ERROR',

  ADD_FAVORITE_BOOK = '[FAVORITE] ADD FAVORITE BOOK',
  ADD_FAVORITE_BOOK_SUCCESS = '[FAVORITE] ADD FAVORITE BOOK SUCCESS',
  ADD_FAVORITE_BOOK_ERROR = '[FAVORITE] ADD FAVORITE BOOK ERROR',

  REMOVE_FAVORITE_CHANNEL = '[FAVORITE] REMOVE FAVORITE CHANNEL',
  REMOVE_FAVORITE_CHANNEL_SUCCESS = '[FAVORITE] REMOVE FAVORITE CHANNEL SUCCESS',
  REMOVE_FAVORITE_CHANNEL_ERROR = '[FAVORITE] REMOVE FAVORITE CHANNEL ERROR',

  REMOVE_FAVORITE_VIDEO = '[FAVORITE] REMOVE FAVORITE VIDEO',
  REMOVE_FAVORITE_VIDEO_SUCCESS = '[FAVORITE] REMOVE FAVORITE VIDEO SUCCESS',
  REMOVE_FAVORITE_VIDEO_ERROR = '[FAVORITE] REMOVE FAVORITE VIDEO ERROR',

  REMOVE_FAVORITE_TVSHOW = '[FAVORITE] REMOVE FAVORITE TVSHOW',
  REMOVE_FAVORITE_TVSHOW_SUCCESS = '[FAVORITE] REMOVE FAVORITE TVSHOW SUCCESS',
  REMOVE_FAVORITE_TVSHOW_ERROR = '[FAVORITE] REMOVE FAVORITE TVSHOW ERROR',

  REMOVE_FAVORITE_BOOK = '[FAVORITE] REMOVE FAVORITE BOOK',
  REMOVE_FAVORITE_BOOK_SUCCESS = '[FAVORITE] REMOVE FAVORITE BOOK SUCCESS',
  REMOVE_FAVORITE_BOOK_ERROR = '[FAVORITE] REMOVE FAVORITE BOOK ERROR'
}

export const loadFavorites = createAction(FAVORITE_ACTION.LOAD_FAVORITES);
export const loadFavoritesSuccess = createAction(
  FAVORITE_ACTION.LOAD_FAVORITES_SUCCESS,
  props<{ favoritesData: FavoritesData }>()
);
export const loadFavoritesError = createAction(
  FAVORITE_ACTION.LOAD_FAVORITES_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const addFavoriteChannel = createAction(FAVORITE_ACTION.ADD_FAVORITE_CHANNEL, props<{ id: number }>());
export const addFavoriteChannelSuccess = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_CHANNEL_SUCCESS,
  props<{ channel: FavoriteChannel }>()
);
export const addFavoriteChannelError = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_CHANNEL_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const addFavoriteVideo = createAction(FAVORITE_ACTION.ADD_FAVORITE_VIDEO, props<{ id: number }>());
export const addFavoriteVideoSuccess = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_VIDEO_SUCCESS,
  props<{ video: FavoriteVideo }>()
);
export const addFavoriteVideoError = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_VIDEO_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const addFavoriteTvshow = createAction(FAVORITE_ACTION.ADD_FAVORITE_TVSHOW, props<{ id: string }>());
export const addFavoriteTvshowSuccess = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_TVSHOW_SUCCESS,
  props<{ tvshow: FavoriteTvshow }>()
);
export const addFavoriteTvshowError = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_TVSHOW_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const addFavoriteBook = createAction(FAVORITE_ACTION.ADD_FAVORITE_BOOK, props<{ id: number }>());
export const addFavoriteBookSuccess = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_BOOK_SUCCESS,
  props<{ book: FavoriteBook }>()
);
export const addFavoriteBookError = createAction(
  FAVORITE_ACTION.ADD_FAVORITE_BOOK_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const removeFavoriteChannel = createAction(FAVORITE_ACTION.REMOVE_FAVORITE_CHANNEL, props<{ id: number }>());
export const removeFavoriteChannelSuccess = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_CHANNEL_SUCCESS,
  props<{ id: number }>()
);
export const removeFavoriteChannelError = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_CHANNEL_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const removeFavoriteVideo = createAction(FAVORITE_ACTION.REMOVE_FAVORITE_VIDEO, props<{ id: number }>());
export const removeFavoriteVideoSuccess = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_VIDEO_SUCCESS,
  props<{ id: number }>()
);
export const removeFavoriteVideoError = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_VIDEO_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const removeFavoriteTvshow = createAction(FAVORITE_ACTION.REMOVE_FAVORITE_TVSHOW, props<{ id: string }>());
export const removeFavoriteTvshowSuccess = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_TVSHOW_SUCCESS,
  props<{ id: string }>()
);
export const removeFavoriteTvshowError = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_TVSHOW_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const removeFavoriteBook = createAction(FAVORITE_ACTION.REMOVE_FAVORITE_BOOK, props<{ id: number }>());
export const removeFavoriteBookSuccess = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_BOOK_SUCCESS,
  props<{ id: number }>()
);
export const removeFavoriteBookError = createAction(
  FAVORITE_ACTION.REMOVE_FAVORITE_BOOK_ERROR,
  props<{ error: HttpErrorResponse }>()
);
