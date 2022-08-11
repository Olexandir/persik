import { startLoading, stopLoading } from './loading.actions';
import { createReducer, on } from '@ngrx/store';
import { LoadingState } from './loading.state';

const initialState: LoadingState = {
  loadersQueue: 0
};

export const loadingReducer = createReducer(
  initialState,
  on(startLoading, (state) => ({ ...state, loadersQueue: state.loadersQueue + 1 })),
  on(stopLoading, (state) => {
    const loadersQueue = state.loadersQueue - 1;
    return {
      ...state,
      loadersQueue: loadersQueue >= 0 ? loadersQueue : 0
    };
  })
);
