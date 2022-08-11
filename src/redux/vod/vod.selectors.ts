import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VodState } from './vod.state';

const vodFeatureSelector = createFeatureSelector<VodState>('vod');

export const selectVodCategories = createSelector(vodFeatureSelector, (state) => state.categories);
