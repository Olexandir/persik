import { VodFacade } from 'src/redux/vod/vod.facade';
import { Component, OnInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BackService, MenuControlService, AuthService } from '@services/core';

import { KeyMap } from '../keymaps/keymap';
import { LoadingFacade } from './../redux/loading/loading.facade';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { OpenCloseAuthModalService } from './services/open-close-auth-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isShowMenu = true;
  public keycode: number;
  public isShowExitModal: boolean;
  public isLoading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  public isAuthorized: boolean;
  public isAuthModalOpen$: Observable<boolean>;
  public code: number;

  constructor(
    private openCloseService: OpenCloseAuthModalService,
    private menuCtrl: MenuControlService,
    private backService: BackService,
    private router: Router,
    private authService: AuthService,
    private loadingFacade: LoadingFacade,
    private favoritesFacade: FavoritesFacade,
    private vodFacade: VodFacade,
    private channelsFacade: ChannelsFacade,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:resize', ['$event'])
  makeFontSize() {
    const fontSize = (16 * window.innerWidth) / 1280;
    document.querySelector('html').style.fontSize = fontSize + 'px';
  }

  ngOnInit(): void {
    this.offNativeNavigation();
    this.isLoading$ = this.loadingFacade.isLoading$;
    this.menuCtrl.menuController.subscribe((isShow) => (this.isShowMenu = isShow));
    this.channelsFacade.loadChannels();
    this.channelsFacade.loadChannelCategories();
    this.vodFacade.loadCategories();
    this.makeFontSize();
    this.loadFavoriteIsNeeded();
    this.authService.loginStateEvent.subscribe((isAuth) => (this.isAuthorized = isAuth));
    this.authService.getAccountInfo().subscribe((user) => {
      this.isAuthorized = !!user;
      this.cdr.detectChanges();
    });
    this.isAuthModalOpen$ = this.openCloseService.isAuthModalOpen$;
    // this.openCloseService.closeAuthModal()
  }

  private loadFavoriteIsNeeded(): void {
    if (this.authService.isLogin) {
      this.favoritesFacade.loadFavoritesData();
    } else {
      this.authService.loginStateEvent.subscribe((isLogin) => {
        if (isLogin) {
          this.favoritesFacade.loadFavoritesData();
        }
      });
    }
  }

  public openModal(): void {
    // this.isAuthModalOpen = true;
    this.openCloseService.openAuthModal();
  }

  public closeModal(): void {
    // this.isAuthModalOpen = false;
    this.openCloseService.closeAuthModal();
  }

  public closeExitModal(): void {
    this.isShowExitModal = false;
  }

  public closeApp(): void {
    window.close();
  }

  private offNativeNavigation(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.navigations(event);
    });
  }

  private navigations(event): void {
    //! TODO it influents in typing
    // event.preventDefault();
    const code = event.keyCode;
    if (code === KeyMap.BACK) {
      if (this.router.url.includes('tv-review')) {
        this.isShowExitModal = !this.isShowExitModal;
      } else {
        this.backService.backEvent.next();
      }
    }
  }
}
