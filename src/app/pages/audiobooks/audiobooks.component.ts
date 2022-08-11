import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Genre, Book } from '@models/core';
import { STUB_GENRE } from '@constants/core';

import { AudiobooksFacade } from 'src/redux/audiobooks/audiobooks.facade';

@Component({
  selector: 'app-audiobooks-page',
  templateUrl: './audiobooks.component.html',
  styleUrls: ['./audiobooks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiobooksPageComponent implements OnInit, OnDestroy {
  public activeGenre: Genre;
  public audiobooksByRows$: Observable<Book[][]>;

  private loadedCount = 0;
  private stepSize = 20;
  private isReloading: boolean;
  private destroy$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private audiobooksFacade: AudiobooksFacade) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params.genre) {
        this.activeGenre = JSON.parse(params.genre);
      } else {
        this.activeGenre = STUB_GENRE;
      }
      this.onGenreChange();
    });
    this.audiobooksByRows$ = this.audiobooksFacade.audiobooks$.pipe(
      map((audiobooks) => {
        const audiobooksByRows = this.buildAudiobooksRows(audiobooks);
        return audiobooksByRows;
      }),
      tap((audiobooks) => {
        if (this.isReloading && audiobooks.length) {
          this.focusOnFirst();
          this.isReloading = false;
        }
      })
    );
  }

  public onGenreChange(): void {
    this.loadedCount = 0;
    this.isReloading = true;
    this.audiobooksFacade.refreshAudiobooks();
    this.loadBooks();
  }

  public loadBooks(): void {
    this.audiobooksFacade.loadAudiobooks(this.loadedCount, this.stepSize, this.activeGenre.id);
    this.loadedCount += this.stepSize;
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByBookId(index: number, book: Book): number {
    return book.id;
  }

  private buildAudiobooksRows(audiobooks: Book[]): Book[][] {
    return audiobooks.reduce((audiobooksByRows, audiobook, ind) => {
      if (ind % 4 === 0) {
        audiobooksByRows.push([]);
      }
      audiobooksByRows[audiobooksByRows.length - 1].push(audiobook);
      return audiobooksByRows;
    }, [] as Book[][]);
  }

  private focusOnFirst(): void {
    console.log('focus');
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
