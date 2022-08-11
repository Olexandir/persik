import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FavoritesState } from './favorite.state';

const favoriteFeatureSelector = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteChannel = createSelector(favoriteFeatureSelector, (state) => state.channels);

export const selectFavoriteTvshow = createSelector(favoriteFeatureSelector, (state) => state.tvshows);

export const selectFavoriteVideo = createSelector(favoriteFeatureSelector, (state) => state.videos);

export const selectFavoriteBook = createSelector(favoriteFeatureSelector, (state) => state.litres);
