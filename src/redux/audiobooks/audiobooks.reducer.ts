import { createReducer, on } from "@ngrx/store";

import { loadAudiobooksSuccess, refreshAudiobooks } from "./audiobooks.action";
import { AudiobooksState } from "./audiobooks.state";

const initialState: AudiobooksState = {
  audiobooks: [],
};

export const audiobooksReducer = createReducer(
  initialState,
  on(loadAudiobooksSuccess, (state, { audiobooks }) => ({
    ...state,
    audiobooks: [...state.audiobooks, ...audiobooks],
  })),
  on(refreshAudiobooks, (state) => ({ ...state, audiobooks: [] }))
);
