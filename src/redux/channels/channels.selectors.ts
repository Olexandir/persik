import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ChannelsState } from 'src/redux/channels/channels.state';

const channelsFeatureSelector = createFeatureSelector<ChannelsState>('channels');

export const selectChannels = createSelector(channelsFeatureSelector, (state) => state.channels);

export const selectTvshows = createSelector(channelsFeatureSelector, (state) => state.currentTvshows);

export const selectChannelsCategories = createSelector(channelsFeatureSelector, (state) => state.categories);

export const selectActiveTvshow = createSelector(channelsFeatureSelector, (state) => state.activeTvshow);
