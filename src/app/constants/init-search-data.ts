import { SearchStorage } from '@models/core';

export const INIT_SEARCH_DATA: SearchStorage = {
  channels: [],
  litres: [],
  tvshows: {
    title: '',
    genre_id: 0,
    videos: null
  },
  videos: {
    title: '',
    genre_id: 0,
    videos: null
  }
};
