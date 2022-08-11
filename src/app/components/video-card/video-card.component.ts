import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { ImageService, DataService } from '@services/core';

import { Video, ContentId, ContentName, Tvshow, Category } from '@models/core';

import { VodFacade } from 'src/redux/vod/vod.facade';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit, OnDestroy {
  @Input() public id: ContentId;
  @Input() public type = 'video';
  @Input() public countInRow: number;
  @Input() public isLast: boolean;
  @Input() public isStub: boolean;
  @Output() public showAllEvent = new EventEmitter<any>();

  public video$: Observable<Video>;
  public tvshow: Tvshow;
  public videoGenres: string[] = [];

  private destroy$ = new Subject();
  private isCanRedirect: boolean;

  constructor(
    private dataService: DataService,
    private imageService: ImageService,
    private router: Router,
    private vodFacade: VodFacade
  ) {}

  ngOnInit() {
    if (this.isVideo && !this.isLast) {
      this.loadVideoInfo(this.id.video_id);
    } else {
      this.loadTvshowInfo();
    }
  }

  public get isFiveInRow(): boolean {
    return this.countInRow === 5;
  }

  private get isVideo(): boolean {
    return !this.isLast && !this.isStub && !!this.id.video_id;
  }

  public get isVideoThumbnail(): boolean {
    return this.type === 'video';
  }

  public showAll(): void {
    this.showAllEvent.emit();
  }

  public openDescription(video: Video): void {
    this.dataService.activeTvshow = null;
    this.dataService.activeVideo = null;
    this.dataService.activeVideo = video;
    if (this.tvshow) {
      this.dataService.activeTvshow = this.tvshow;
    }
    this.dataService.currentGenres = this.videoGenres;
    const type = this.isVideo ? ContentName.VIDEO : ContentName.TV;
    if (this.isCanRedirect) {
      this.router.navigate(['content-description', type]);
    }
  }

  private loadVideoInfo(id: number): void {
    this.video$ = this.dataService.getVideoInfo(id).pipe(
      withLatestFrom(this.vodFacade.vodCategories$),
      map(([video, categories]) => {
        this.isCanRedirect = true;
        if (video.cover === null && this.tvshow) {
          const cover = this.imageService.getTvshowFrame(this.tvshow);
          return { ...video, cover };
        }
        this.videoGenres = this.getGenresNamesByVideo(categories, video);
        return video;
      })
    );
  }

  private getGenresNamesByVideo(categories: Category[], video: Video): string[] {
    const allGenresArray = categories.map((cat) => cat.genres);
    const allGenres = allGenresArray.reduce((acc, genres) => acc.concat(genres));
    const genresNames = allGenres
      .filter((genre) => video.genres.some((genreId) => genreId === genre.id))
      .map((res) => {
        const name = res.name;
        const part = name.split(')');
        const result = part[1] ? part[1] : name;
        return result;
      });
    return genresNames;
  }

  private loadTvshowInfo(): void {
    if (!this.isLast && !this.isStub) {
      this.dataService
        .getTvshowInfo(this.id.tvshow_id)
        .pipe(
          tap((res) => {
            this.loadVideoInfo(res.video_id);
          })
        )
        .subscribe((res) => (this.tvshow = res));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
