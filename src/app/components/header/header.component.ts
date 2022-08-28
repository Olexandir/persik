import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize, map, catchError } from 'rxjs/operators';

import { AuthService } from '@services/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';
import { UserInfo } from '@models/core';

import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userInfo$: Observable<UserInfo>;
  public isAuthorised: boolean;

  private timer: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit(): void {
    this.isAuthorised = false;
    moment.locale('ru');
    this.timer = setInterval(this.cdr.markForCheck, 60500);
    this.initUserInfo();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  private initUserInfo(): void {
    // this.loadingFacade.startLoading();
    this.userInfo$ = this.authService.getAccountInfo().pipe(finalize(() => this.loadingFacade.stopLoading()));
    this.authService
      .getAccountInfo()
      .subscribe((data) => {
        this.isAuthorised = !!data;
        console.log(this.isAuthorised);
      });
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
}
