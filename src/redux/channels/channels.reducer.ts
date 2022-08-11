import { createReducer, on } from '@ngrx/store';

import { ChannelsState } from './channels.state';
import {
  loadChannelsSuccess,
  loadChannelCategoriesSuccess,
  loadTvshowsSuccess,
  loadChannels,
  loadActiveTvshowSuccess
} from './channels.action';

const initialState: ChannelsState = {
  channels: [],
  categories: [],
  currentTvshows: [],
  activeTvshow: null
};

export const channelsReducer = createReducer(
  initialState,
  on(loadChannels, (state) => ({ ...state, channels: [] })),
  on(loadChannelsSuccess, (state, { channels }) => ({
    ...state,
    channels
  })),
  on(loadTvshowsSuccess, (state, { tvshows }) => ({
    ...state,
    currentTvshows: tvshows
  })),
  on(loadChannelCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories
  })),
  on(loadActiveTvshowSuccess, (state, { tvshow }) => ({ ...state, activeTvshow: tvshow }))
);
