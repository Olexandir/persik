import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { BackService, DataService } from '@services/core';
import { ContentId, Genre } from '@models/core';
import { STUB_GENRE } from '../../constants/stub-genre';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-series-page',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesPageComponent implements OnInit, OnDestroy {
  private activatedRouteSubscriber: Subscription;
  private backServiceSubscriber: Subscription;
  private readonly categoryId = 2; // Series
  private readonly size = 20; // count of content to load
  public readonly countInRow = 4;
  private total: number;
  public activeGenre: Genre;

  public genres: Genre[];
  public skip = 0;
  public idsMatrix: IdsRow[] = [];
  public statusText = 'Загрузка';

  constructor(
    private dataService: DataService,
    private backService: BackService,
    private activatedRoute: ActivatedRoute,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.backServiceSubscriber = this.backService.backEvent.subscribe((_) => {
      this.backService.goToMain();
    });
    this.activatedRouteSubscriber = this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.genre) {
        this.activeGenre = JSON.parse(params.genre);
      } else {
        this.activeGenre = STUB_GENRE;
      }
      this.onGenreChange();
    });
  }

  public loadVideos(): void {
    this.dataService
      .getVideoContent(this.categoryId, this.activeGenre.id, this.size, this.skip)
      .then((response) => {
        this.total = response.total;
        let row: ContentId[] = [];
        for (let i = 0; i < response.videos.length; i++) {
          if (i % this.countInRow === 0 && i !== 0) {
            this.idsMatrix.push({ row });
            row = [];
          }
          row.push(response.videos[i]);
          if (this.idsMatrix.length === 1 && this.idsMatrix[0].row.length > 0) {
            this.focusOnFirst();
          }
          if (i === response.videos.length - 1) {
            this.idsMatrix.push({ row });
          }
        }
      })
      .finally(() => {
        this.stopLoading();
        this.skip += this.size;
      });
  }

  public get isHaveVideos(): boolean {
    return this.idsMatrix.length > 0;
  }

  public preloadVideos(): void {
    if (this.total && this.total > this.skip) {
      this.startLoading();
      this.loadVideos();
    }
  }

  public onGenreChange(): void {
    this.dataService.activeGenreId = this.activeGenre.id;
    this.idsMatrix = [];
    this.skip = 0;
    this.startLoading();
    this.loadVideos();
  }

  private startLoading(): void {
    this.loadingFacade.startLoading();
    this.statusText = 'Загрузка';
  }

  private stopLoading(): void {
    this.loadingFacade.stopLoading();
    this.statusText = this.isHaveVideos ? '' : 'Нет контента';
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 300);
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscriber) {
      this.activatedRouteSubscriber.unsubscribe();
    }
    if (this.backServiceSubscriber) {
      this.backServiceSubscriber.unsubscribe();
    }
  }
}

export interface IdsRow {
  row: ContentId[];
}
