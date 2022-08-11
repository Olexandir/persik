import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  Banner,
  SearchStorage,
  Payment,
  PaymentInfo,
  Book,
  Tvshow,
  Channel,
  Genre,
  ChannelStreamData,
  VideoStreamData,
  Video,
  Person,
  Persons,
  Category,
  VideoInterface,
  SearchData,
  TvshowInformationBackend,
  TvshowsInterface,
  VideoInformationBackend,
  ChannelsInformationBackend
} from '@models/core';
import { INIT_SEARCH_DATA } from '@constants/core';

import { VodState } from 'src/redux/vod/vod.state';
import { TariffData } from '../models/tariff';
import { STUB_GENRE } from '../constants/stub-genre';

@Injectable()
export class DataService {
  public activeVideo: Video;
  public activeTvshow: Tvshow;
  public activeAudiobook: Book;
  public currentGenres: string[];
  public activeGenreId: number;

  public searchString = '';
  public searchData: SearchStorage = INIT_SEARCH_DATA;

  constructor(private http: HttpClient, private vodStore: Store<VodState>) {}

  private readonly BASE_URL = 'https://api.persik.by/';

  public loadChannels(): Observable<Channel[]> {
    const requestUrl = this.BASE_URL.concat('v2/content/channels');
    return this.http
      .get<ChannelsInformationBackend>(requestUrl)
      .pipe(map((channelsArray) => channelsArray.channels.sort((a, b) => b.rank - a.rank)));
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 200);
  }

  public getChannelInfo(id: number): Promise<Channel> {
    if (id) {
      const params: HttpParams = new HttpParams().set('id', id.toString());
      return this.http
        .get<ChannelsInformationBackend>(this.BASE_URL.concat('v2/content/channel'), {
          params
        })
        .pipe(map((data) => data.channels[0]))
        .toPromise();
    }
  }

  public getChannelStream(id: number): Observable<ChannelStreamData> {
    return this.http.get<ChannelStreamData>(this.BASE_URL.concat('v1/stream/channel'), {
      params: { id }
    });
  }

  public loadChannelCategories(): Observable<Genre[]> {
    const requestUrl = this.BASE_URL.concat('v2/categories/channel');
    return this.http.get<Genre[]>(requestUrl).pipe(map((categories) => [STUB_GENRE, ...categories]));
  }

  public loadTvshowsByIds(channelIds: number[]): Observable<Tvshow[]> {
    const queryString = channelIds.map((channelId) => `channels[]=${channelId}`).join('&');
    const requestUrl = this.BASE_URL.concat('v2/epg/onair?', queryString);
    return this.http.get<TvshowInformationBackend>(requestUrl).pipe(map((response) => response.tvshows));
  }

  public getTvshowStream(id: string): Promise<ChannelStreamData> {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http
      .get<ChannelStreamData>(this.BASE_URL.concat('v1/stream/show'), {
        params
      })
      .toPromise();
  }

  public getVideoStream(id: number): Promise<VideoStreamData> {
    const params: HttpParams = new HttpParams().set('id', id.toString());
    return this.http.get<VideoStreamData>(this.BASE_URL.concat('v1/stream/video'), { params }).toPromise();
  }

  public getTvshows(channelId: number): Observable<Tvshow[]> {
    return this.http
      .get<TvshowsInterface>(this.BASE_URL.concat('v2/epg/tvshows'), {
        params: {
          'channels[]': channelId.toString(),
          limit: '1000000'
        }
      })
      .pipe(map((response) => response.tvshows.items));
  }

  public getVideoInfo(id: number | string): Observable<Video> {
    return this.http
      .get<VideoInformationBackend>(this.BASE_URL.concat('v2/content/video'), {
        params: { 'id[]': id }
      })
      .pipe(
        map((res) => {
          if (res && res.videos) {
            return res.videos[0];
          }
          return null;
        })
      );
  }

  public loadFeaturedContent(categoryId: number, genreId: number): Observable<VideoInterface> {
    return this.http.get<VideoInterface>(this.BASE_URL.concat('v2/content/videos'), {
      params: {
        size: 10,
        offset: 0,
        category_id: categoryId,
        genre_id: genreId !== 0 && genreId ? genreId : '',
        sort: 'last'
      }
    });
  }

  public getVideosInfo(ids: any[]): Observable<Video[]> {
    const params = ids.map((id) => `id[]=${id}`).join('&');
    return this.http
      .get<VideoInformationBackend>(this.BASE_URL.concat('v2/content/video?', params))
      .pipe(map((res) => (res && res.videos ? res.videos : null)));
  }

  public getTvshowInfo(id: number | string): Observable<Tvshow> {
    return this.http
      .get<TvshowInformationBackend>(this.BASE_URL.concat('v2/content/tvshow'), {
        params: {
          'id[]': id
        }
      })
      .pipe(map((res) => res.tvshows[0]));
  }

  public loadActors(ids: number[]): Observable<Person[]> {
    const params = ids.map((id) => `id[]=${id}`).join('&');
    return this.http
      .get<Persons>(this.BASE_URL.concat('v2/content/person?', params))
      .pipe(map((response) => response.persons));
  }

  public loadVodCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL.concat('v2/categories/video'));
  }

  public getVideoContent(categoryId: number, genreId: number, size?: number, skip?: number): Promise<VideoInterface> {
    const params: HttpParams = new HttpParams()
      .set('size', size && size !== 0 ? size.toString() : '')
      .set('offset', skip && skip !== 0 ? skip.toString() : '')
      .set('category_id', categoryId.toString())
      .set('genre_id', genreId !== 0 && genreId ? genreId.toString() : '')
      .set('sort', 'last');
    return this.http
      .get<VideoInterface>(this.BASE_URL.concat('v2/content/videos'), {
        params
      })
      .toPromise();
  }

  public getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.BASE_URL.concat('v2/content/banners2')).pipe(
      map((res) => {
        return res.filter((banner) => banner.img_url_tv.length > 0);
      })
    );
  }

  public searchContent(text: string): Promise<SearchData> {
    const params: HttpParams = new HttpParams()
      .set('query', text)
      .set('channels', 'true')
      .set('videos', 'true')
      .set('tvshows', 'true');
    return this.http.get<SearchData>(this.BASE_URL.concat('v2/search'), { params }).toPromise();
  }

  public searchByAll(): Promise<SearchData> {
    const params: HttpParams = new HttpParams().set('query', 'все');
    return this.http.get<SearchData>(this.BASE_URL.concat('v1/search'), { params }).toPromise();
  }

  public getTariffs(): Promise<TariffData> {
    return this.http.get<TariffData>(this.BASE_URL.concat('v2/billing/products')).toPromise();
  }

  public createPayment(payment: Payment): Promise<PaymentInfo> {
    const formData: FormData = new FormData();
    formData.append('pay_sys', payment.pay_sys);
    formData.append('product_option_id[]', `${payment.product_option_id.toString()}`);
    return this.http.post<PaymentInfo>(this.BASE_URL.concat('v2/billing/payment'), formData).toPromise();
  }
}
