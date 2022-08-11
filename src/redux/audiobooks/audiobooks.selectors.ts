import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AudiobooksState } from 'src/redux/audiobooks/audiobooks.state';

const audiobooksFeatureSelector = createFeatureSelector<AudiobooksState>('audiobooks');

export const selectAudiobooks = createSelector(audiobooksFeatureSelector, (state) => state.audiobooks);
