import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Category, VodSections } from '@models/core';

export enum VOD_ACTION {
  LOAD_VOD_CATEGORIES = '[VOD] LOAD VOD CATEGORIES',
  LOAD_VOD_CATEGORIES_SUCCESS = '[VOD] LOAD VOD CATEGORIES SUCCESS',
  LAOD_VOD_CATEGORIES_ERROR = '[VOD] LOAD VOD CATEGORIES ERROR'
}

export const loadVodCategories = createAction(VOD_ACTION.LOAD_VOD_CATEGORIES);
export const loadVodCategoriesSuccess = createAction(
  VOD_ACTION.LOAD_VOD_CATEGORIES_SUCCESS,
  props<{ categories: Category[] }>()
);
export const loadVodCategoriesError = createAction(
  VOD_ACTION.LAOD_VOD_CATEGORIES_ERROR,
  props<{ error: HttpErrorResponse }>()
);
