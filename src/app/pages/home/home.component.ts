import { Component, OnInit } from '@angular/core';
import { PlayerControllerService, DataService } from '@services/core';
import { Channel, ContentId } from '@models/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CategoryType } from '../../constants/genres.enum';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  public channels$: Observable<Channel[]>;
  public filmIds$: Observable<ContentId[]>;
  public cartoonIds$: Observable<ContentId[]>;
  public serieIds$: Observable<ContentId[]>;

  constructor(
    private dataService: DataService,
    private playerController: PlayerControllerService,
    private channelsFacade: ChannelsFacade
  ) {}

  ngOnInit() {
    this.playerController.stop();
    this.loadChannels();
    this.loadFilms();
    this.loadCartoons();
    this.loadSeries();
  }

  private loadChannels(): void {
    this.channels$ = this.channelsFacade.channels$.pipe(
      map((channels) => channels.slice(0, 10)),
      tap(() => {
        this.focusOnFirst();
      })
    );
  }

  private loadFilms(): void {
    this.filmIds$ = this.dataService.loadFeaturedContent(CategoryType.FILMS, 881).pipe(map((data) => data.videos));
  }

  private loadCartoons(): void {
    this.cartoonIds$ = this.dataService
      .loadFeaturedContent(CategoryType.CARTOONS, 890)
      .pipe(map((data) => data.videos));
  }

  private loadSeries(): void {
    this.serieIds$ = this.dataService.loadFeaturedContent(CategoryType.SERIES, 886).pipe(map((data) => data.videos));
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 200);
  }
}
