import { Category } from './category';

export interface VideoInterface {
  total: number;
  videos: ContentId[];
}

export interface VodSections {
  sections: VodSection[];
}

export interface VodSection {
  name?: string;
  source?: VodSource;
  type: ContentType;
  total?: number;
  videos: any[];
}

export interface VodSource {
  version: number;
  module: string;
  action: string;
  params: VodParams;
}

export interface VodParams {
  size: number;
  sort: string;
  genre_id: number;
  category_id: number;
  order: string;
}

export interface Episode {
  episode: string;
  season: string;
  type: string;
  video_id: number;
  tvshow_id?: string;
}

export interface Raiting {
  count: number;
  system_uid: string;
  value: number;
}

export interface Raitings {
  imdb: Raiting;
  kinopoisk: Raiting;
  local: Raiting;
}

export class Video {
  age_rating: string;
  art: string;
  cast: number[];
  category_id: number;
  countries: string[];
  cover: string;
  description: string;
  director: number[];
  duration: number;
  episodes: Episode[];
  genres: number[];
  international_name: string;
  is_series: boolean;
  name: string;
  ratings: Raitings;
  video_id: number;
  year: string;
  in_products?: InProduct[];
  is_pladform: boolean;
  pladform_id?: number;
  tvshow_id?: string;

  constructor() {
    this.age_rating = '+0';
    this.art = null;
    this.cast = [];
    this.category_id = 0;
    this.countries = [];
    this.cover = '';
    this.description = 'Нет описания';
    this.director = [];
    this.duration = 0;
    this.episodes = [];
    this.genres = [];
    this.international_name = 'Нет данных';
    this.is_series = false;
    this.name = 'Нет данных';
    this.video_id = 0;
    this.year = 'Нет данных';
  }
}

interface InProduct {
  product_id: number;
  product_options: ProductOption[];
}

interface ProductOption {
  option_id: number;
  cost: string;
  currency: string;
  term: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface CountriesBackend {
  total: number;
  countries: any;
}

export interface RatingFilter {
  id: number;
  name: string;
  value: string;
}

export interface PlayerVideoInfo {
  type: ContentType;
  videoId?: number;
  channelId?: number;
  start?: number;
  name: string;
  casts: string[];
  genres: string[];
}

export interface ContentId {
  video_id?: number;
  tvshow_id?: string;
}

export interface FeaturedVideosTape {
  genre_id: number;
  title: string;
  videos: any[];
}

export interface VideoInformationBackend {
  videos: Video[];
}

export type ContentType = 'tv' | 'video' | 'channel' | 'audiobook' | 'audiobook-trial';

export enum ContentName {
  TV = 'tv',
  VIDEO = 'video',
  CHANNEL = 'channel',
  BOOK = 'audiobook'
}
