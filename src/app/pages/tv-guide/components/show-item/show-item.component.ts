import { ContentName } from '@models/core';
import { Router } from '@angular/router';
import { Component, Input, AfterViewInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Tvshow } from '@models/core';
import * as scrollIV from 'scroll-into-view';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShowItemComponent implements AfterViewInit {

  @Input() item: Tvshow;
  @Input() currentTime: number;
  @Input() dvr: number;
  @Output() focusItem = new EventEmitter<Tvshow>();

  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (this.isCurrent) {
      this.scrollToActiveItem();
      this.onTvshowFocus();
    }
  }

  public get progress(): number {
    if (this.isCurrent) {
      const delta = (this.currentTime - this.item.start) / (this.item.stop - this.item.start);
      return Math.round(delta * 100);
    }
    return null;
  }

  public onTvshowFocus(): void {
    this.focusItem.emit(this.item);
  }

  public get isCurrent(): boolean {
    return (this.item.start <= this.currentTime && this.item.stop > this.currentTime);
  }

  public get isFuture(): boolean {
    return (this.item.start > this.currentTime && this.item.stop > this.currentTime);
  }

  public get isArcive(): boolean {
    if (!this.isFuture && !this.isCurrent && this.dvr > 0) {
      return this.item.start > (this.currentTime - this.dvr);
    }
    return false;
  }

  public showVideo(): void {
    if (!this.isCurrent && !this.isFuture && this.isArcive) {
      this.router.navigate(['video-player', ContentName.TV, this.item.tvshow_id ]);
    }
    if (this.isCurrent) {
      this.router.navigate(['channel-player', this.item.channel_id]);
    }
  }

  private scrollToActiveItem(): void {
    setTimeout(() => {
      const item = document.querySelector('.tvshow.active');
      scrollIV(item);
    }, 100);
  }
}
