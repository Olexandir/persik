import { Injectable } from '@angular/core';

import { selectLoadingStatus } from './loading.selectors';

import { Store } from '@ngrx/store';

import { LoadingState } from './loading.state';
import { startLoading, stopLoading } from './loading.actions';

@Injectable({ providedIn: 'root' })
export class LoadingFacade {
  isLoading$ = this.store.select(selectLoadingStatus);

  constructor(private store: Store<LoadingState>) {}

  public startLoading(): void {
    this.store.dispatch(startLoading());
  }

  public stopLoading(): void {
    this.store.dispatch(stopLoading());
  }
}
