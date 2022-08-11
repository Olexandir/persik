import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { BookGenre, Book, Genre, LoadAudiobooksParams } from "@models/core";

@Injectable({ providedIn: "root" })
export class LitresService {
  private readonly LITRES_BASE_URL = "https://api.persik.by/v2/litres";
  private readonly TRIAL_MP3_URL =
    "https://partnersdnld.litres.ru/get_mp3_trial/";
  private readonly COVER_URL = "https://partnersdnld.litres.ru/pub/c/cover/";

  constructor(private http: HttpClient) {}

  public getList(requestParams: LoadAudiobooksParams): Observable<Book[]> {
    return this.http.get<Book[]>(this.LITRES_BASE_URL, {
      params: {
        ...requestParams,
      },
    });
  }

  public getGenres(): Observable<Genre[]> {
    return this.http
      .get<BookGenre[]>(this.LITRES_BASE_URL.concat("/genres"))
      .pipe(
        map((data) => {
          const genres: Genre[] = data.map((res) => {
            const genre: Genre = {
              id: res.litres_genre_id,
              is_main: true,
              name: res.name,
              name_en: res.token,
              ch_count: null,
            };
            return genre;
          });
          const firstGenre: Genre = {
            id: -1,
            is_main: true,
            name: "Бестселлеры",
            name_en: "bestsellers",
          };
          return [firstGenre, ...genres];
        })
      );
  }

  public getListPromise(
    genreId: number,
    offset: number,
    size: number
  ): Promise<Book[]> {
    const requestParams: LoadAudiobooksParams = {
      offset,
      size,
    };
    if (genreId !== -1) {
      requestParams.genreId = genreId;
    }
    const listsPromise = this.getList(requestParams).toPromise();
    return listsPromise;
  }

  public getBooksInfo(ids: number[]): Observable<Book[]> {
    const requestParams = ids.map((id) => `id[]=${id}`).join("&");
    return this.http.get<Book[]>(
      this.LITRES_BASE_URL.concat("/item?", requestParams)
    );
  }

  public getUserBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.LITRES_BASE_URL, {
      params: {
        bought: 1,
      },
    });
  }

  public getCover(id: number, cover: string): string {
    return this.COVER_URL.concat(id.toString(), ".", cover);
  }

  public getTrial(id: number): string {
    return this.TRIAL_MP3_URL.concat(id.toString(), ".mp3");
  }
}
