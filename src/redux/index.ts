import { Type } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import { audiobooksReducer } from 'src/redux/audiobooks/audiobooks.reducer';
import { AudiobooksState } from 'src/redux/audiobooks/audiobooks.state';
import { AudiobooksEffects } from './audiobooks/audiobooks.effects';
import { ChannelsEffects } from './channels/channels.effects';
import { channelsReducer } from './channels/channels.reducer';
import { ChannelsState } from './channels/channels.state';
import { FavoritesEffects } from './favorite/favorite.effects';
import { favoritesReducer } from './favorite/favorite.reducer';
import { FavoritesState } from './favorite/favorite.state';

import { loadingReducer } from './loading/loading.reducer';
import { LoadingState } from './loading/loading.state';
import { VodEffects } from './vod/vod.effects';
import { vodReducer } from './vod/vod.reducer';
import { VodState } from './vod/vod.state';

export interface AppState {
  audiobooks: AudiobooksState;
  loading: LoadingState;
  channels: ChannelsState;
  favorites: FavoritesState;
  vod: VodState;
}

export const appReducers: ActionReducerMap<AppState> = {
  audiobooks: audiobooksReducer,
  loading: loadingReducer,
  channels: channelsReducer,
  favorites: favoritesReducer,
  vod: vodReducer
};

type AppEffect = Type<AudiobooksEffects | ChannelsEffects | FavoritesEffects | VodEffects>;

export const appEffects: AppEffect[] = [AudiobooksEffects, ChannelsEffects, FavoritesEffects, VodEffects];
