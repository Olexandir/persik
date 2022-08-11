import { LoadingFacade } from './../../../redux/loading/loading.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataService, LitresService, BackService } from '@services/core';
import { FeaturedVideosTape, Channel, Book } from '@models/core';

import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-search-page',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public isSearchState = true;
  public searchString = '';
  public searchedChannels: Channel[] = [];
  public videosTape: FeaturedVideosTape;
  public tvshowsTape: FeaturedVideosTape;
  public books: Book[] = [];

  private channels: Channel[] = [];
  private channelsSubscriber: Subscription;
  private backServiceSubscriber: Subscription;

  public minLengthError = 'Для поиска введите минимум 2 символа';
  public isShowError: boolean;
  public isNotFound: boolean;

  constructor(
    private channelsFacade: ChannelsFacade,
    private dataService: DataService,
    private backService: BackService,
    private litresService: LitresService,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.backServiceSubscriber = this.backService.backEvent.subscribe((_) => {
      this.backService.goToMain();
    });
    this.channelsFacade.channels$.subscribe((channels) => {
      if (channels.length) {
        this.channels = channels;
      }
    });
    this.focusOn(1);
    this.loadSearchResults();
  }

  public get isHaveBooks(): boolean {
    return this.books && this.books.length > 0;
  }

  public get isHaveChannels(): boolean {
    return this.searchedChannels && this.searchedChannels.length > 0;
  }

  public onKeyboardEvent(key: string): void {
    switch (key) {
      case 'backspace':
        if (this.searchString.length > 0) {
          this.searchString = this.searchString.slice(0, -1);
        }
        break;
      case 'OK':
        this.search();
        break;

      default:
        this.searchString += key;
        break;
    }
  }

  public get isHaveVideos(): boolean {
    return this.videosTape.videos && this.videosTape.videos.length > 0;
  }

  public get isHaveTvshows(): boolean {
    return this.tvshowsTape.videos && this.tvshowsTape.videos.length > 0;
  }

  public setSearchState(): void {
    this.isSearchState = true;
    this.focusOn(1);
  }

  public onTopEvent(): void {
    this.focusOn(0);
  }

  public onBottomEvent(): void {
    this.focusOn(1);
  }

  /* public searchByAll(): void {
    this.isShowError = false;
    this.loaderService.startLoading();
    this.dataService.searchByAll().then(res => {
      Promise.all([
        this.loadChannels(res.channels),
        this.loadVideos(res.video),
        this.loadTvshows(res.shows)
      ]).then(_ => {
        if (this.isHaveChannels || this.isHaveVideos || this.isHaveTvshows) {
          this.isSearchState = false;
          this.saveSearchResults();
          this.dataService.searchString = '';
          this.focusOn(1);
        }
        this.loaderService.stopLoading();
      });
      this.loaderService.stopLoading();
    });
  } */

  private search() {
    if (this.searchString.length >= 2) {
      this.isShowError = false;
      this.isNotFound = false;
      this.dataService.searchData.channels = [];
      this.dataService.searchData.tvshows = {
        title: '',
        genre_id: 0,
        videos: []
      };
      this.dataService.searchData.videos = {
        title: '',
        genre_id: 0,
        videos: []
      };
      this.dataService.searchData.litres = [];
      this.loadingFacade.startLoading();
      this.dataService.searchContent(this.searchString).then((res) => {
        const litresIds = res.litres ? res.litres : [];
        Promise.all([
          this.loadChannels(res.channels),
          this.loadVideos(res.videos),
          this.loadTvshows(res.tvshows),
          this.loadBooks(litresIds)
        ]).then((_) => {
          if (this.isHaveChannels || this.isHaveVideos || this.isHaveTvshows || this.isHaveBooks) {
            this.isSearchState = false;
            this.saveSearchResults();
            this.focusOn(1);
          } else {
            this.isNotFound = true;
          }
          this.loadingFacade.stopLoading();
        });
        this.loadingFacade.stopLoading();
      });
    } else {
      this.isShowError = true;
    }
  }

  private saveSearchResults(): void {
    this.dataService.searchString = this.searchString;
    this.dataService.searchData = {
      channels: this.searchedChannels,
      videos: this.videosTape,
      tvshows: this.tvshowsTape,
      litres: this.books
    };
  }

  private loadSearchResults(): void {
    this.searchString = this.dataService.searchString;
    const dataStore = this.dataService.searchData;
    if (dataStore && dataStore.channels) {
      this.searchedChannels = dataStore.channels;
    }
    if (dataStore && dataStore.videos) {
      this.videosTape = dataStore.videos;
    }
    if (dataStore && dataStore.tvshows) {
      this.tvshowsTape = dataStore.tvshows;
    }
    if (dataStore && dataStore.litres) {
      this.books = dataStore.litres;
    }
    if (this.isHaveChannels || this.isHaveVideos || this.isHaveTvshows) {
      this.isSearchState = false;
      this.focusOn(1);
    }
  }

  private loadChannels(channelIds: Array<{ channel_id: number }>): Promise<any> {
    return new Promise((resolve) => {
      if (channelIds.length > 0) {
        this.searchedChannels = [];
        channelIds.forEach((item, index) => {
          const channel = this.channels.find((c) => +c.channel_id === +item.channel_id);
          if (channel) {
            this.searchedChannels.push(channel);
            if (index === channelIds.length - 1) {
              resolve(null);
            }
          } else {
            this.loadingFacade.startLoading();
            this.dataService
              .getChannelInfo(item.channel_id)
              .then((data) => {
                this.searchedChannels.push(data);
                if (index === channelIds.length - 1) {
                  resolve(null);
                }
              })
              .finally(() => this.loadingFacade.stopLoading());
          }
        });
      } else {
        resolve(null);
      }
    });
  }

  private loadVideos(videoIds: Array<{ video_id: number }>): Promise<any> {
    return new Promise((resolve) => {
      this.videosTape = {
        genre_id: 0,
        title: 'Видео',
        videos: []
      };
      if (videoIds.length > 0) {
        this.videosTape.videos = videoIds;
      }
      resolve(null);
      // if (videoIds.length > 0) {
      //   const ids = videoIds.map(item => +item.video_id);
      //   this.dataService.getVideosInfo(ids).then(res => {
      //     this.videosTape.videos = res;
      //     resolve(null);
      //   });
      // } else {
      //   resolve(null);
      // }
    });
  }

  private loadTvshows(tvshowIds: Array<{ tvshow_id: string }>): Promise<any> {
    return new Promise((resolve) => {
      this.tvshowsTape = {
        genre_id: 0,
        title: 'Архив с тв',
        videos: []
      };
      if (tvshowIds.length > 0) {
        this.tvshowsTape.videos = tvshowIds;
      }
      resolve(null);
      // if (tvshowIds.length > 0) {
      //   const ids = tvshowIds.map(item => item.tvshow_id);
      //   this.dataService.getVideosInfo(ids).then(res => {
      //     this.tvshowsTape.videos = res;
      //     resolve(null);
      //   });
      // } else {
      //   resolve(null);
      // }
    });
  }

  private loadBooks(ids: number[]): Promise<any> {
    return new Promise((resolve) => {
      if (ids.length === 0) {
        resolve(null);
      }
      this.loadingFacade.startLoading();
      this.litresService
        .getBooksInfo(ids)
        .toPromise()
        .then((data) => {
          this.books = data;
          resolve(null);
        })
        .finally(() => this.loadingFacade.stopLoading());
    });
  }

  private focusOn(index: number): void {
    setTimeout(() => {
      const elem = document.querySelectorAll('.page [nav-group]')[index] as HTMLElement;
      if (elem) {
        elem.focus();
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.channelsSubscriber) {
      this.channelsSubscriber.unsubscribe();
    }
    if (this.backServiceSubscriber) {
      this.backServiceSubscriber.unsubscribe();
    }
  }
}
