import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Channel, Genre } from '@models/core';

import { Tvshow } from './../../app/models/tvshow';

export enum ChannelsAction {
  LOAD_CHANNELS = '[CHANNELS] LOAD CHANNELS',
  LOAD_CHANNELS_SUCCESS = '[CHANNELS] LOAD CHANNELS SUCCESS',
  LOAD_CHANNELS_ERROR = '[CHANNELS] LOAD CHANNELS ERROR',

  LOAD_TVSHOWS = '[CHANNEL TVSHOWS] LOAD TVSHOWS',
  LOAD_TVSHOWS_SUCCESS = '[CHANNEL TVSHOWS] LOAD TVSHOWS SUCCESS',
  LOAD_TVSHOWS_ERROR = '[CHANNEL TVSHOWS] LOAD TVSHOWS ERROR',

  LOAD_CHANNEL_CATEGORIES = '[CHANNEL CATEGORIES] LOAD CHANNEL CATEGORIES',
  LOAD_CHANNEL_CATEGORIES_SUCCESS = '[CHANNEL CATEGORIES] LOAD CHANNEL CATEGORIES SUCCESS',
  LOAD_CHANNEL_CATEGORIES_ERROR = '[CHANNEL CATEGORIES] LOAD CHANNEL CATEGORIES ERROR',

  LOAD_ACTIVE_TVSHOW = '[CHANNEL TVSHOWS] LOAD ACTIVE TVSHOW',
  LOAD_ACTIVE_TVSHOW_SUCCESS = '[CHANNEL TVSHOWS] LOAD ACTIVE TVSHOW SUCCESS',
  LOAD_ACTIVE_TVSHOW_ERROR = '[CHANNEL TVSHOWS] LOAD ACTIVE TVSHOW ERROR'
}

export const loadChannels = createAction(ChannelsAction.LOAD_CHANNELS);
export const loadChannelsSuccess = createAction(ChannelsAction.LOAD_CHANNELS_SUCCESS, props<{ channels: Channel[] }>());
export const loadChannelsError = createAction(
  ChannelsAction.LOAD_CHANNELS_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const loadTvshows = createAction(ChannelsAction.LOAD_TVSHOWS, props<{ channelIds: number[] }>());
export const loadTvshowsSuccess = createAction(ChannelsAction.LOAD_TVSHOWS_SUCCESS, props<{ tvshows: Tvshow[] }>());
export const loadTvshowsError = createAction(ChannelsAction.LOAD_TVSHOWS_ERROR, props<{ error: HttpErrorResponse }>());

export const loadActiveTvshow = createAction(ChannelsAction.LOAD_ACTIVE_TVSHOW, props<{ channelId: number }>());
export const loadActiveTvshowSuccess = createAction(
  ChannelsAction.LOAD_ACTIVE_TVSHOW_SUCCESS,
  props<{ tvshow: Tvshow }>()
);
export const loadActiveTvshowError = createAction(
  ChannelsAction.LOAD_ACTIVE_TVSHOW_ERROR,
  props<{ error: HttpErrorResponse }>()
);

export const loadChannelCategories = createAction(ChannelsAction.LOAD_CHANNEL_CATEGORIES);
export const loadChannelCategoriesSuccess = createAction(
  ChannelsAction.LOAD_CHANNEL_CATEGORIES_SUCCESS,
  props<{ categories: Genre[] }>()
);
export const loadChannelCategoriesError = createAction(
  ChannelsAction.LOAD_CHANNEL_CATEGORIES_ERROR,
  props<{ error: HttpErrorResponse }>()
);
