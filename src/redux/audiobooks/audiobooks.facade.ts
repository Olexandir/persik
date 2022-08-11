import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { LoadAudiobooksParams } from "@models/core";

import { AudiobooksState } from "./audiobooks.state";
import { loadAudiobooks, refreshAudiobooks } from "./audiobooks.action";
import { selectAudiobooks } from "./audiobooks.selectors";

@Injectable({ providedIn: "root" })
export class AudiobooksFacade {
  public audiobooks$ = this.store.select(selectAudiobooks);

  constructor(private store: Store<AudiobooksState>) {}

  public loadAudiobooks(offset: number, size: number, genreId?: number): void {
    const params: LoadAudiobooksParams = {
      size,
      offset,
    };
    if (genreId !== -1) {
      params.genreId = genreId;
    }
    this.store.dispatch(loadAudiobooks({ params }));
  }

  public refreshAudiobooks(): void {
    this.store.dispatch(refreshAudiobooks());
  }
}
