import { FavoriteBook, FavoriteChannel, FavoriteTvshow, FavoriteVideo } from '@models/core';

export interface FavoritesState {
  channels: FavoriteChannel[];
  tvshows: FavoriteTvshow[];
  videos: FavoriteVideo[];
  litres: FavoriteBook[];
}
