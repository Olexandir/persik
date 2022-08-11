import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadVodCategories } from './vod.action';
import { selectVodCategories } from './vod.selectors';
import { VodState } from './vod.state';

@Injectable({ providedIn: 'root' })
export class VodFacade {
  public vodCategories$ = this.store.select(selectVodCategories);

  constructor(private store: Store<VodState>) {}

  public loadCategories(): void {
    this.store.dispatch(loadVodCategories());
  }
}
