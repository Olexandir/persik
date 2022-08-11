import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, OnDestroy {

  private timer: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    moment.locale('ru');
    this.timer = setInterval(this.cdr.markForCheck, 60500);
  }

  private get isHomePage(): boolean {
    return this.router.url.includes('home');
  }

  public get time(): string {
    return moment().format('HH:mm');
  }

  public get date(): string {
    if (this.isHomePage) {
      return '';
    }
    return moment().format('DD MMMM');
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
