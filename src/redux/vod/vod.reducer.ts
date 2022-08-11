import { createReducer, on } from '@ngrx/store';
import { loadVodCategoriesSuccess } from './vod.action';
import { VodState } from './vod.state';

const initialState: VodState = {
  categories: []
};

export const vodReducer = createReducer(
  initialState,
  on(loadVodCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: [...state.categories, ...categories]
  }))
);
