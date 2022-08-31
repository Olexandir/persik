import { VodFacade } from 'src/redux/vod/vod.facade';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BackService, MenuControlService, AuthService } from '@services/core';

import { KeyMap } from '../keymaps/keymap';
import { LoadingFacade } from './../redux/loading/loading.facade';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isShowMenu = true;
  public keycode: number;
  public isShowExitModal: boolean;
  public isLoading$: Observable<boolean>;

  public code: number;

  constructor(
    private menuCtrl: MenuControlService,
    private backService: BackService,
    private router: Router,
    private authService: AuthService,
    private loadingFacade: LoadingFacade,
    private favoritesFacade: FavoritesFacade,
    private vodFacade: VodFacade,
    private channelsFacade: ChannelsFacade
  ) {}

  @HostListener('window:resize', ['$event'])
  makeFontSize() {
    const fontSize = (16 * window.innerWidth) / 1280;
    document.querySelector('html').style.fontSize = fontSize + 'px';
  }

  ngOnInit() {
    this.offNativeNavigation();
    this.isLoading$ = this.loadingFacade.isLoading$;
    this.menuCtrl.menuController.subscribe((isShow) => (this.isShowMenu = isShow));
    this.channelsFacade.loadChannels();
    this.channelsFacade.loadChannelCategories();
    this.vodFacade.loadCategories();
    this.makeFontSize();

    this.loadFavoriteIsNeeded();
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
    event.preventDefault();
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
