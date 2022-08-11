import { createAction } from "@ngrx/store";

export enum LOADING_ACTION {
  START_LOADING = "[LOADING] START LOADING",
  STOP_LOADING = "[LOADING] STOP LOADING",
}

export const startLoading = createAction(LOADING_ACTION.START_LOADING);
export const stopLoading = createAction(LOADING_ACTION.STOP_LOADING);
