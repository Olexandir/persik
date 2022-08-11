import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter,
  AfterViewInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import * as scrollIV from 'scroll-into-view';

@Component({
  selector: 'app-tv-guide-dates',
  templateUrl: './tv-guide-dates.component.html',
  styleUrls: ['./tv-guide-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TvGuideDatesComponent implements AfterViewInit, OnChanges {

  @Input() dates: string[] = [];
  @Input() activeDate: string;
  @Output() changeDateEvent = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.dates.length > 0) {
      this.scrollToActiveItem();
    }
  }

  ngAfterViewInit() {
    this.scrollToActiveItem();
  }

  public get isHaveDates(): boolean {
    return this.dates.length > 0;
  }

  public changeDate(date: string): void {
    this.cdr.markForCheck();
    this.changeDateEvent.emit(date);
    this.scrollToActiveItem();
  }

  public isActiveDate(date: string): boolean {
    if (this.activeDate) {
      return this.activeDate === date;
    }
    return false;
  }

  private scrollToActiveItem(): void {
    setTimeout(() => {
      const item = document.querySelector('.dates__item.active');
      scrollIV(item);
    }, 500);
  }

}
