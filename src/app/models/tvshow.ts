export class Tvshow {
  tvshow_id: string;
  channel_id: number;
  title: string;
  date: string;
  start: number;
  stop: number;
  video_id: number;
  deleted: number;
  ts: number;
  cover?: string;

  constructor() {
    this.title = 'Нет данных';
  }
}

export interface TvshowsInterface {
  tvshows: {
    items: Tvshow[];
  };
}

export interface TvshowInformationBackend {
  tvshows: Tvshow[];
}
