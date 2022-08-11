import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingState } from './loading.state';

const loadingFeatureSelector = createFeatureSelector<LoadingState>('loading');

export const selectLoadingStatus = createSelector(loadingFeatureSelector, (state) => state.loadersQueue !== 0);
