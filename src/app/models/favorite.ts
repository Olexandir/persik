export interface FavoriteChannel {
  channel_id: number;
  added_time: number;
}

export interface FavoriteTvshow {
  tvshow_id: string;
  added_time: number;
}

export interface FavoriteVideo {
  video_id: number;
  added_time: number;
}

export interface FavoriteBook {
  litres_item_id: number;
  added_time: number;
}
export interface FavoriteChannelsResponse {
  channels: FavoriteChannel[];
}

export interface FavoriteVideosResponse {
  videos: FavoriteVideo[];
}

export interface FavoriteTvshowsResponse {
  tvshows: FavoriteTvshow[];
}

export interface FavoriteBooksResponse {
  litres: FavoriteBook[];
}

export interface FavoritesData {
  channels: FavoriteChannel[];
  videos: FavoriteVideo[];
  tvshows: FavoriteTvshow[];
  litres: FavoriteBook[];
}

export enum FavoriteRoutes {
  TV_SHOW = 'tvshow',
  VIDEO = 'video',
  CHANNEL = 'channel',
  BOOK = 'litres-item'
}
