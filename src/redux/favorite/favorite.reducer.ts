import { createReducer, on } from '@ngrx/store';

import {
  addFavoriteBookSuccess,
  addFavoriteChannelSuccess,
  addFavoriteTvshowSuccess,
  addFavoriteVideoSuccess,
  loadFavoritesSuccess,
  removeFavoriteBookSuccess,
  removeFavoriteChannelSuccess,
  removeFavoriteTvshowSuccess,
  removeFavoriteVideoSuccess
} from './favorite.action';

import { FavoritesState } from './favorite.state';

const initialState: FavoritesState = {
  channels: [],
  tvshows: [],
  videos: [],
  litres: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(loadFavoritesSuccess, (state, { favoritesData }) => ({
    ...state,
    channels: favoritesData.channels,
    tvshows: favoritesData.tvshows,
    videos: favoritesData.videos,
    litres: favoritesData.litres
  })),
  on(addFavoriteChannelSuccess, (state, { channel }) => ({
    ...state,
    channels: [...state.channels, channel]
  })),
  on(addFavoriteTvshowSuccess, (state, { tvshow }) => ({ ...state, tvshows: [...state.tvshows, tvshow] })),
  on(addFavoriteVideoSuccess, (state, { video }) => ({ ...state, videos: [...state.videos, video] })),
  on(addFavoriteBookSuccess, (state, { book }) => ({ ...state, litres: [...state.litres, book] })),
  on(removeFavoriteChannelSuccess, (state, { id }) => {
    const channels = state.channels.filter((channel) => channel.channel_id !== id);
    return {
      ...state,
      channels
    };
  }),
  on(removeFavoriteTvshowSuccess, (state, { id }) => {
    const tvshows = state.tvshows.filter((tvshow) => tvshow.tvshow_id !== id);
    return {
      ...state,
      tvshows
    };
  }),
  on(removeFavoriteVideoSuccess, (state, { id }) => {
    const videos = state.videos.filter((video) => video.video_id !== id);
    return {
      ...state,
      videos
    };
  }),
  on(removeFavoriteBookSuccess, (state, { id }) => {
    const litres = state.litres.filter((litresItem) => litresItem.litres_item_id !== id);
    return {
      ...state,
      litres
    };
  })
);
