import { CONTROLS_TEXT } from './constants/contols-text.enum';
import { LoadingFacade } from './../../../redux/loading/loading.facade';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { finalize, map, take, takeUntil } from 'rxjs/operators';

import { ContentName, Channel, Person, Tvshow, Video, Book, BookFile } from '@models/core';

import {
  DataService,
  BackService,
  TimeService,
  AuthService,
  LitresService
} from '@services/core';

import { ChannelsFacade } from 'src/redux/channels/channels.facade';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';

@Component({
  selector: 'app-content-description',
  templateUrl: './content-description.component.html',
  styleUrls: ['./content-description.component.scss']
})
export class ContentDescriptionPageComponent implements OnInit, OnDestroy {
  public video: Video;
  public tvshow: Tvshow;
  public genres: string[];
  public authors: string[];
  public directors$: Observable<Person[]>;
  public casts$: Observable<Person[]>;
  public channel: Channel;
  public isCanPlay: boolean;
  public bookInfo: Book;
  public isBought$: Observable<boolean>;
  public chapters: BookFile[] = [];
  public contentName: string;
  public favoriteText = CONTROLS_TEXT.ADD_TO_FAVORITE;

  private type: ContentName;
  private destroy$ = new Subject();
  private isFavorite: boolean;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private backService: BackService,
    private location: Location,
    private timeService: TimeService,
    private authService: AuthService,
    private router: Router,
    private litresService: LitresService,
    private channelsFacade: ChannelsFacade,
    private favoritesFacade: FavoritesFacade,
    private loadingFacade: LoadingFacade
  ) { }

  ngOnInit(): void {
    this.backService.backEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.location.back();
    });
    const params = this.activatedRoute.snapshot.params;
    this.type = params.type;

    if (this.type !== ContentName.BOOK) {
      this.loadVideoInfo();
    } else {
      this.loadBookInfo();
    }
    this.getIsFavorite().subscribe(res => {
      this.isFavorite = res;
      this.favoriteText = this.getFavoriteText(res);
    });
    this.focusOnFirst();
  }

  private loadBookInfo(): void {
    this.bookInfo = this.dataService.activeAudiobook;
    this.contentName = this.getNameWithColor(this.bookInfo.title);
    if (this.isAuth) {
      this.isBought$ = this.getIsBookBought();
    }
    this.genres = this.bookInfo.genres.map((genre) => genre.title);
    this.casts$ = this.getCasts();
    this.video = this.getVideoEntity(this.bookInfo);

    this.chapters = this.bookInfo.file_groups ? this.bookInfo.file_groups[1].files : [];
    this.genres = this.bookInfo.genres.map((genre) => genre.title);
    this.authors = this.bookInfo.authors.map((author) => {
      return author['first-name'] + ' ' + author['last-name'];
    });
  }

  private getFavoriteText(isFavorite: boolean): CONTROLS_TEXT {
    if (isFavorite) {
      return CONTROLS_TEXT.REMOVE_FROM_FAVORITE;
    }
    return CONTROLS_TEXT.ADD_TO_FAVORITE;
  }

  private loadVideoInfo(): void {
    this.video = this.dataService.activeVideo;
    this.tvshow = this.dataService.activeTvshow;
    this.genres = this.dataService.currentGenres;
    this.isCanPlay = this.type === ContentName.VIDEO;
    this.loadDirectors();
    this.loadCasts();
    this.loadChannelInfo();
    this.contentName = this.getNameWithColor(this.video.name);
  }

  private getVideoEntity(bookInfo: Book): Video {
    const { adult, chars, annotation, title, file_groups, id, date_written_s } = bookInfo;
    const isSeries = file_groups && file_groups[1] && file_groups[1].files && file_groups[1].files.length > 1;
    const cover = this.litresService.getCover(this.bookInfo.id, this.bookInfo.cover);
    const year = date_written_s ? date_written_s.toString() : null;

    const video: Video = {
      age_rating: adult.toString(),
      category_id: 7,
      cast: [],
      art: null,
      cover,
      duration: chars,
      description: annotation,
      name: title,
      genres: [],
      episodes: [],
      is_pladform: false,
      is_series: isSeries,
      director: [],
      countries: [],
      international_name: '',
      ratings: null,
      video_id: id,
      year
    };

    return video;
  }

  private getNameWithColor(name: string): string {
    if (name) {
      const nameArray: string[] = name.split(' ');
      if (nameArray.length === 1) {
        return name;
      }
      let colorString: string = nameArray.shift();
      colorString += " <span class='orange-text'>";
      const lastText: string = nameArray.toString();
      colorString += lastText.replace(new RegExp(',', 'g'), ' ');
      colorString += '</span>';
      return colorString;
    }
  }

  private getCasts(): Observable<Person[]> {
    const casts = this.bookInfo.authors.map((author) => {
      const person: Person = {
        info: null,
        international_name: null,
        person_id: null,
        photo: null,
        name: author['first-name'] + ' ' + author['last-name']
      };
      return person;
    });

    return of(casts);
  }

  public getIsBookBought(): Observable<boolean> {
    const isBought$ = this.litresService.getUserBooks().pipe(
      map((data) => {
        if (data) {
          return !!data.find((book) => book.id === this.bookInfo.id);
        }
        return false;
      })
    );
    return isBought$;
  }

  public get isAudiobook(): boolean {
    return this.type === ContentName.BOOK;
  }

  public get isAuth(): boolean {
    return this.authService.isLogin;
  }

  public get isSeries(): boolean {
    return this.video.is_series;
  }

  public buyBook(): void {
    this.router.navigate(['account/book-pay']);
  }

  public playVideo(video?: Video): void {
    if (video) {
      const type = video.tvshow_id ? ContentName.TV : ContentName.VIDEO;
      const id = video.tvshow_id ? video.tvshow_id : video.video_id;
      this.router.navigate(['video-player', type, id]);
    } else {
      if (this.video.is_series && this.video.episodes.length > 0) {
        const firstEpisode = this.video.episodes[0];
        const firstIdToPlay = firstEpisode.type === 'tvshow' ? firstEpisode.tvshow_id : firstEpisode.video_id;
        const type = firstEpisode.type === 'tvshow' ? ContentName.TV : ContentName.VIDEO;
        this.router.navigate(['video-player', type, firstIdToPlay]);
      } else {
        if (this.tvshow) {
          if (this.tvshow.tvshow_id) {
            this.router.navigate(['video-player', ContentName.TV, this.tvshow.tvshow_id]);
            return;
          }
          if (this.tvshow.video_id) {
            this.router.navigate(['video-player', ContentName.VIDEO, this.tvshow.video_id]);
            return;
          }
        } else {
          this.router.navigate(['video-player', ContentName.VIDEO, this.video.video_id]);
        }
      }
    }
  }

  public playTrial(): void {
    setTimeout(() => {
      this.router.navigate(['video-player', ContentName.BOOK, this.video.video_id], {
        queryParams: {
          cover: this.video.cover,
          stream: this.litresService.getTrial(this.video.video_id)
        }
      });
    }, 100);
  }

  public playFull(): void {
    const stream = this.bookInfo.file_groups[1].files[0].stream;
    this.router.navigate(['video-player', ContentName.BOOK, this.video.video_id], {
      queryParams: {
        cover: this.video.cover,
        stream
      }
    });
  }

  public authorization(): void {
    this.router.navigate(['auth']);
  }

  public scrollToTop(): void {
    const page = document.querySelector('.page');
    if (page) {
      try {
        page.scrollTo(0, 0);
      } catch (e) {
        console.log('Scroll top is not a function');
      }
    }
  }

  private getIsFavorite(): Observable<boolean> {
    const id = this.tvshow && this.tvshow.tvshow_id ? this.tvshow.tvshow_id : this.video.video_id;
    return this.favoritesFacade.checkContentForFavorite(id, this.type).pipe(take(1));
  }

  public toggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFromFavorite();
    } else {
      this.addToFavorite();
    }
    this.favoriteText = this.getFavoriteText(this.isFavorite);
  }

  private addToFavorite(): void {
    const id = this.tvshow && this.tvshow.tvshow_id ? this.tvshow.tvshow_id : this.video.video_id;
    this.favoritesFacade.addFavoriteContent(id, this.type);
    this.isFavorite = true;
  }

  private removeFromFavorite(): void {
    const id = this.tvshow && this.tvshow.tvshow_id ? this.tvshow.tvshow_id : this.video.video_id;
    this.favoritesFacade.removeFavoriteContent(id, this.type);
    this.isFavorite = false;
  }

  private loadDirectors(): void {
    if (this.video.director && this.video.director.length > 0) {
      this.loadingFacade.startLoading();
      this.directors$ = this.dataService.loadActors(this.video.director).pipe(
        finalize(() => this.loadingFacade.stopLoading())
      );
    }
  }

  private loadCasts(): void {
    if (this.video.cast && this.video.cast.length > 0) {
      this.casts$ = this.dataService.loadActors(this.video.cast).pipe(
        finalize(() => this.loadingFacade.stopLoading())
      );
    }
  }

  private loadChannelInfo(): void {
    if (this.tvshow) {
      this.channelsFacade.channels$.pipe(takeUntil(this.destroy$)).subscribe((channels) => {
        this.channel = channels.find((channel) => channel.channel_id === this.tvshow.channel_id);
        const currentTime = this.timeService.currentTime;
        const dvr = currentTime - this.channel.dvr_sec;
        this.isCanPlay = dvr < this.tvshow.start && this.tvshow.stop < currentTime && this.channel.available;
      });
    }
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
