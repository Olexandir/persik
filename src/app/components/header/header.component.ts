import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '@services/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';
import { UserInfo } from '@models/core';

import * as moment from 'moment';
import { OpenCloseAuthModalService } from 'src/app/services/open-close-auth-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isAuthorized: boolean;

  @Output() confirmEvent = new EventEmitter<void>();
  @Output() openModalChange = new EventEmitter<boolean>();

  public userInfo$: Observable<UserInfo>;

  private timer: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private loadingFacade: LoadingFacade,
    private openCloseService: OpenCloseAuthModalService
  ) {}

  ngOnInit(): void {
    // this.isAuthorized$ = this.authService.loginStateEvent
    moment.locale('ru');
    // this.timer = setInterval(this.cdr.markForCheck, 60500);
    this.initUserInfo();
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

  public openAuthModal(): void {
    // this.openModalChange.emit(true);
    this.openCloseService.openAuthModal();
  }

  public closeApp(): void {
this.confirmEvent.next();
  }

  private initUserInfo(): void {
    this.userInfo$ = this.authService.getAccountInfo().pipe(finalize(() => this.loadingFacade.stopLoading()));
  }

  private get isHomePage(): boolean {
    return this.router.url.includes('home');
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
