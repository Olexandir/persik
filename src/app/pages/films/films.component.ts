import { LoadingFacade } from './../../../redux/loading/loading.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CategoryType } from './../../constants/genres.enum';
import { ContentId, Genre } from '@models/core';
import { DataService, BackService } from '@services/core';
import { STUB_GENRE } from '../../constants/stub-genre';

@Component({
  selector: 'app-films-page',
  templateUrl: 'films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsPageComponent implements OnInit, OnDestroy {
  public skip = 0;
  public idsMatrix: IdsRow[] = [];
  public statusText = 'Загрузка';
  public readonly countInRow = 4; // количество карточек в ряду
  public isHaveVideos: boolean;

  private readonly categoryId = CategoryType.FILMS;
  private readonly size = 20; // count of content to load
  private total: number;
  private activeGenre: Genre;
  private destroy$ = new Subject();

  constructor(
    private dataService: DataService,
    private backService: BackService,
    private activatedRoute: ActivatedRoute,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe(() => this.backService.goToMain());
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params && params.genre) {
        this.activeGenre = JSON.parse(params.genre);
      } else {
        this.activeGenre = STUB_GENRE;
      }
      this.onGenreChange();
    });
  }

  private loadVideos(): void {
    this.dataService
      .getVideoContent(this.categoryId, this.activeGenre.id, this.size, this.skip)
      .then(({ videos, total }) => {
        this.total = total;
        let row: ContentId[] = [];

        for (let i = 0; i < videos.length; i++) {
          if (i % this.countInRow === 0 && i !== 0) {
            this.idsMatrix.push({ row });
            row = [];
          }
          row.push(videos[i]);
          if (this.idsMatrix.length === 1 && this.idsMatrix[0].row.length > 0) {
            this.focusOnFirst();
          }
          if (i === videos.length - 1) {
            this.idsMatrix.push({ row });
          }
        }

        const exp = videos.reduce((acc, item, index) => {
          if (index !== 0 && index % this.countInRow === 0) {
            return [...acc, {}];
          }
          return acc;
        }, []);

        console.log(this.idsMatrix);

        this.stopLoading();
        this.skip += this.size;
        this.isHaveVideos = this.isVideosLoaded();
      });
  }

  private isVideosLoaded(): boolean {
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
    this.isHaveVideos = this.isVideosLoaded();
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}

interface IdsRow {
  row: ContentId[];
}
