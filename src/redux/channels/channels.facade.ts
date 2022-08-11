import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ChannelsState } from 'src/redux/channels/channels.state';
import { loadChannels, loadChannelCategories, loadTvshows, loadActiveTvshow } from './channels.action';
import { selectActiveTvshow, selectChannels, selectChannelsCategories, selectTvshows } from './channels.selectors';

@Injectable({ providedIn: 'root' })
export class ChannelsFacade {
  public channels$ = this.store.select(selectChannels);
  public channelCategories$ = this.store.select(selectChannelsCategories);
  public tvshows$ = this.store.select(selectTvshows);
  public activeTvshow$ = this.store.select(selectActiveTvshow);

  constructor(private store: Store<ChannelsState>) {}

  public loadChannels(): void {
    this.store.dispatch(loadChannels());
  }

  public loadChannelCategories(): void {
    this.store.dispatch(loadChannelCategories());
  }

  public loadTvshows(channelIds: number[]): void {
    this.store.dispatch(loadTvshows({ channelIds }));
  }

  public loadActiveTvshow(channelId: number): void {
    this.store.dispatch(loadActiveTvshow({ channelId }));
  }
}
