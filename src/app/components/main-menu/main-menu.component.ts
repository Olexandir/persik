import { STUB_GENRE } from 'src/app/constants/stub-genre';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Genre } from '@models/core';
import { AuthService, LitresService } from '@services/core';

import { menus } from './menus';

import { MenuItem } from './interfaces/menu-item.interface';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { environment } from 'src/environments/environment.prod';
import { ACCOUNT_ITEM, AUTH_ITEM, FAVORITE_ITEM } from './constants/menu-items';
import { VodFacade } from 'src/redux/vod/vod.facade';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  public favoriteItem = FAVORITE_ITEM;
  public authItem = AUTH_ITEM;
  public accountItem = ACCOUNT_ITEM;

  public isCertificateMode: boolean;
  public isShowGenreMenu: boolean;
  public genres$: Observable<Genre[]>;
  public activeRoute: string;

  private idsVodMenuItems = [1, 2, 3, 4, 6];
  private idsChannelMenuItems = [7, 8];
  private idsLitresMenuItems = [9];

  constructor(
    private router: Router,
    private authService: AuthService,
    private channelsFacade: ChannelsFacade,
    private litresService: LitresService,
    private vodFacade: VodFacade
  ) {}

  public onMenuItemFocus(item: MenuItem): void {
    this.isShowGenreMenu =
      this.idsVodMenuItems.includes(item.id) ||
      this.idsChannelMenuItems.includes(item.id) ||
      this.idsLitresMenuItems.includes(item.id);

    if (this.isShowGenreMenu) {
      if (this.idsVodMenuItems.includes(item.id)) {
        this.genres$ = this.getVodGenres(item);
      }
      if (this.idsChannelMenuItems.includes(item.id)) {
        this.genres$ = this.getChannelGenres();
      }
      if (this.idsLitresMenuItems.includes(item.id)) {
        this.genres$ = this.litresService.getGenres();
      }
      this.activeRoute = item.redirect;
    }
  }

  public onGenreChange(genre: Genre): void {
    this.router.navigate([this.activeRoute], {
      queryParams: { genre: JSON.stringify(genre) }
    });
  }

  public onEnterKey(item: MenuItem): void {
    this.router.navigate([item.redirect]);
    this.isShowGenreMenu = false;
    this.focusOnFirst();
  }

  public onMenuItemsBlur(): void {
    setTimeout(() => {
      const item = document.activeElement;
      if (!item.classList.contains('main-menu__item') && !item.classList.contains('genre-filter__item')) {
        this.isShowGenreMenu = false;
      }
    }, 0);
  }

  public get isLogin(): boolean {
    return this.authService.isLogin;
  }

  public get menuItems(): MenuItem[] {
    return this.isCertificateMode ? menus.short : menus.full;
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 200);
  }

  private getVodGenres(item: MenuItem): Observable<Genre[]> {
    return this.vodFacade.vodCategories$.pipe(
      map((categories) => {
        let genres = categories.find((cat) => Number(cat.id) === item.id).genres;
        genres = genres.filter((genre) => genre.is_main && genre.name_en !== 'pladform');
        return [STUB_GENRE, ...genres];
      })
    );
  }

  private getChannelGenres(): Observable<Genre[]> {
    this.channelsFacade.loadChannelCategories();
    return this.channelsFacade.channelCategories$.pipe(
      map((channelCategories) => {
        if (environment.platform === 'panasonic') {
          const isFsr400 = navigator.userAgent.includes('SW-Version/V8-T56FSPS-LF1V');
          if (isFsr400) {
            return channelCategories.filter((genre) => genre.id !== 679);
          }
        }
        return channelCategories;
      })
    );
  }
}
