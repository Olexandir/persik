import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  FavoriteTvshowsResponse,
  FavoriteVideosResponse,
  FavoriteBooksResponse,
  FavoriteChannelsResponse,
  FavoritesData,
  FavoriteRoutes
} from '@models/core';

@Injectable()
export class FavoriteService {
  private BASE_URL = 'https://api.persik.by/';

  constructor(private http: HttpClient) {}

  public loadFavorites(): Observable<FavoritesData> {
    return forkJoin([
      this.loadFavoriteChannels(),
      this.loadFavoriteTvshows(),
      this.loadFavoriteVideos(),
      this.loadFavoriteBooks()
    ]).pipe(
      map(([channelsResponse, tvshowsResponse, videosResponse, booksResponse]) => {
        const favoritesOverallResponse: FavoritesData = {
          channels: channelsResponse.channels,
          tvshows: tvshowsResponse.tvshows,
          videos: videosResponse.videos,
          litres: booksResponse.litres
        };
        return favoritesOverallResponse;
      })
    );
  }

  public loadFavoriteChannels(): Observable<FavoriteChannelsResponse> {
    return this.http.get<FavoriteChannelsResponse>(this.BASE_URL.concat('v2/favorite/channels'));
  }
  public loadFavoriteBooks(): Observable<FavoriteBooksResponse> {
    return this.http.get<FavoriteBooksResponse>(this.BASE_URL.concat('v2/favorite/litres-items'));
  }
  public loadFavoriteVideos(): Observable<FavoriteVideosResponse> {
    return this.http.get<FavoriteVideosResponse>(this.BASE_URL.concat('v2/favorite/videos'));
  }
  public loadFavoriteTvshows(): Observable<FavoriteTvshowsResponse> {
    return this.http.get<FavoriteTvshowsResponse>(this.BASE_URL.concat('v2/favorite/tvshows'));
  }

  public addFavoriteContent<IdType>(id: IdType, route: FavoriteRoutes): Observable<IdType> {
    return this.http.post<void>(this.BASE_URL.concat('v2/favorite/', route, `?id=${id}`), null).pipe(map(() => id));
  }

  public removeFavoriteContent<IdType>(id: IdType, route: FavoriteRoutes): Observable<IdType> {
    return this.http.delete<void>(this.BASE_URL.concat('v2/favorite/', route, `?id=${id}`)).pipe(map(() => id));
  }
}
