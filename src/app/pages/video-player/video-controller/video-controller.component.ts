import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PlayerVideoInfo, ContentName } from '@models/core';
import { ImageService } from '@services/core';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VideoControllerComponent {

  @Input() duration: number;
  @Input() currentTime: number;
  @Input() seekTime: number;
  @Input() isShowControls: boolean;
  @Input() videoInfo: PlayerVideoInfo;
  @Output() seekMouseEvent = new EventEmitter<number>();

  constructor(private imageService: ImageService) {}

  public get isSeekingEnabled(): boolean {
    return this.currentTime !== this.seekTime;
  }

  public get progress(): number {
    return Math.round((this.currentTime / this.duration) * 1000) / 10;
  }

  public get seekPosition(): number {
    return Math.round((this.seekTime / this.duration) * 1000) / 10;
  }

  public get thumbnailPosition(): number { // magic numbers method
    const width = 10;
    const leftBorderPercents = Math.round((width / 160) * 10000) / 100;
    const rightBorderPercents = Math.round(((160 - width) / 16) * 1000) / 100;
    if (this.seekPosition < leftBorderPercents) {
      return 0;
    }
    if (this.seekPosition > rightBorderPercents) {
      return 80 - width;
    }
    return ((this.seekPosition * 80) / 100) - (width / 2);
  }

  public get thumbnailTrackerImage(): string {
    if (this.videoInfo.type === ContentName.VIDEO) {
      return this.imageService.getVideoFrame(this.videoInfo.videoId, this.seekTime, 'resize', 384);
    }
    if (this.videoInfo.type === ContentName.TV) {
      const time = this.videoInfo.start + this.seekTime;
      return this.imageService.getChannelFrame(this.videoInfo.channelId, time, 'resize', 384);
    }
  }

  public seekByCursor(event: MouseEvent): void {
    const progressLine = event.target as HTMLDivElement;
    const progressLineWidth = progressLine.getBoundingClientRect().width;
    const seekCursorTime = (event.offsetX * this.duration) / progressLineWidth;
    this.seekMouseEvent.emit(seekCursorTime);
  }

  public get thumbnails(): string[] {
    if (this.duration && this.videoInfo) {
      const step = this.duration / 13;
      const thumbArray: string[] = [];
      if (this.videoInfo.type === ContentName.VIDEO) {
        for (let i = 1; i < 13; i++) {
          const img = this.imageService.getVideoFrame(this.videoInfo.videoId, step * i, 'resize', 384);
          thumbArray.push(img);
        }
      }
      if (this.videoInfo.type === ContentName.TV) {
        for (let i = 1; i < 13; i++) {
          const time = this.videoInfo.start + step * i;
          const img = this.imageService.getChannelFrame(this.videoInfo.channelId, time, 'resize', 384);
          thumbArray.push(img);
        }
      }
      return thumbArray;
    }
  }
}
