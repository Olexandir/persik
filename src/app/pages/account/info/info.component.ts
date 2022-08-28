import { LoadingFacade } from './../../../../redux/loading/loading.facade';
import { DataService, AuthService } from '@services/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@models/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';

@Component({
  selector: 'app-info-page',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoPageComponent implements OnInit {
  public userInfo$: Observable<UserInfo>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private favoritesFacade: FavoritesFacade,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.loadingFacade.startLoading();
    this.userInfo$ = this.authService.getAccountInfo().pipe(finalize(() => this.loadingFacade.stopLoading()));
  }

  public logOut(): void {
    this.authService.logout();
    this.dataService.loadChannels();
    this.favoritesFacade.loadFavoritesData();
    this.router.navigate(['tv-review']);
  }
}
