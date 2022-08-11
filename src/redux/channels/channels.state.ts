import { Channel, Genre, Tvshow } from '@models/core';

export interface ChannelsState {
  channels: Channel[];
  categories: Genre[];
  currentTvshows: Tvshow[];
  activeTvshow: Tvshow;
}
