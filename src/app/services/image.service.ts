import { Tvshow } from '@models/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  constructor() { }

  getChannelFrame(id: number, time: number, transform: string = 'crop', width: number = 500, height: number = 300): string {
    const t = Math.round(time);
    return `https://old.persik.by/utils/show-frame.php?c=${id}&t=${t}&tr=${transform}&w=${width}&h=${height}`;
  }

  getChannelLogo(id: number) {
    return `https://persik.by/media/channels/logos/${id}.png`;
  }

  // getTvshowFrame(tvshow: Tvshow): string {
  //   const currentTime: number = this.timeService.currentTime;
  //   const time = +tvshow.start + ((tvshow.stop - tvshow.start) / 2);
  //   if (+tvshow.start <= currentTime && +tvshow.stop > currentTime) {
  //     return this.getChannelFrame(tvshow.channel_id, currentTime);
  //   }
  //   if (+tvshow.stop < currentTime) {
  //     return this.getChannelFrame(tvshow.channel_id, time);
  //   }
  //   return '';
  // }

  getTvshowFrame(tvshow: Tvshow, transform = 'none', width = 0, height = 0) {
    const l = tvshow.stop - tvshow.start;
    const time = tvshow.start + ((3 / 7) * l);
    return this.getChannelFrame(tvshow.channel_id, time, transform, width, height);
  }

  getVideoFrame(videoId: number, time: number, transform = 'none', width = 0, height = 0) {
    const t = Math.round(time / 60) * 60;
    return `https://persik.by/utils/show-frame-video.php?v=${videoId}&t=${t}&tr=${transform}&w=${width}&h=${height}`;
  }
}
