import { Book } from "./litres";
import { Channel } from "./channel";
import { FeaturedVideosTape } from "@models/core";
export interface SearchData {
  channels: Array<{ channel_id: number }>;
  videos: Array<{ video_id: number }>;
  tvshows: Array<{ tvshow_id: string }>;
  litres: number[];
}

// export interface SearchData {
//   channels: Array<{id: number}>;
//   video: Array<{id: number}>;
//   shows: Array<{id: string}>;
// }

export interface SearchStorage {
  channels: Channel[];
  videos: FeaturedVideosTape;
  tvshows: FeaturedVideosTape;
  litres: Book[];
}
