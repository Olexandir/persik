import { Tvshow } from './tvshow';
import { Genre } from './category';

export interface Channel {
  channel_id: number;
  name: string;
  dvr_sec: number;
  age_rating: string;
  genres: number[];
  logo: string;
  priority: number;
  rank: number;
  available: boolean;
  stream_url: string;
}

export interface Channels {
  channels: Channel[];
  categories: Genre[];
}

export interface FeaturedChannelsTape {
  genre_id: number;
  title: string;
  channels: Channel[];
}

export interface ChannelCard {
  channel: Channel;
  tvshow: Tvshow;
}

export interface ChannelsInformationBackend {
  channels: Channel[];
}
