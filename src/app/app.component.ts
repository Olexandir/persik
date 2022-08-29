import { VodFacade } from 'src/redux/vod/vod.facade';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BackService, DataService, MenuControlService, AuthService } from '@services/core';

import { environment } from 'src/environments/environment';
import { FavoriteService } from './services/favorite.service';
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

  public isAuthModalOpen: boolean;
  public code: number;

  private readonly gacodes = {
    android: 'UA-148363715-1',
    philips: 'UA-148363715-2',
    panasonic: 'UA-148363715-3',
    samsung: 'UA-148363715-4',
    lg: 'UA-148363715-5'
  };

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
    this.isAuthModalOpen = true;
    this.integrateGA();
    this.offNativeNavigation();
    this.isLoading$ = this.loadingFacade.isLoading$;
    this.addCordovaScript();
    this.menuCtrl.menuController.subscribe((isShow) => (this.isShowMenu = isShow));
    this.channelsFacade.loadChannels();
    this.channelsFacade.loadChannelCategories();
    this.vodFacade.loadCategories();
    this.makeFontSize();
    this.loadFavoriteIsNeeded();
  }

  public openModal(): void {
    this.isAuthModalOpen = true;
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

  private integrateGA(): void {
    const code = this.gacodes[environment.platform];
    if (code) {
      const head: HTMLHeadElement = document.querySelector('head');
      const reference: HTMLMetaElement = document.querySelector('meta');

      const script1: HTMLScriptElement = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${code}`;

      const script2: HTMLScriptElement = document.createElement('script');
      script2.innerHTML = `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${code}');`;

      head.insertBefore(script1, reference);
      head.insertBefore(script2, reference);
    }
  }

  public closeExitModal(): void {
    this.isShowExitModal = false;
  }

  private addCordovaScript(): void {
    if (environment.platform === 'android') {
      const script = document.createElement('script');
      script.src = 'cordova.js';
      document.head.appendChild(script);
    }
  }

  private offNativeNavigation(): void {
    document.addEventListener('deviceready', () => {
      document.addEventListener('backbutton', this.androidBackHandler.bind(this), false);
    });
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.navigations(event);
    });
  }

  private navigations(event): void {
    event.preventDefault();
    const code = event.keyCode;
    if (code === KeyMap.BACK) {
      if (this.router.url.includes('home')) {
        this.isShowExitModal = !this.isShowExitModal;
      } else {
        this.backService.backEvent.next();
      }
    }
  }

  private androidBackHandler(event) {
    event.preventDefault();
    if (this.router.url.includes('home')) {
      this.isShowExitModal = !this.isShowExitModal;
    } else {
      this.backService.backEvent.next();
    }
  }
}
