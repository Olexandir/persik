import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ContentName, Book } from '@models/core';
import { DataService, LitresService, TimeService } from '@services/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-audiobook-card',
  templateUrl: './audiobook-card.component.html',
  styleUrls: ['./audiobook-card.component.scss']
})
export class AudiobookCardComponent {
  @Input() book: Book;
  @Input() last: boolean;
  @Input() isStub: boolean;
  @Output() showAllEvent = new EventEmitter<any>();

  constructor(
    private litresService: LitresService,
    private dataService: DataService,
    private router: Router,
    private timeService: TimeService,
    private loadingFacade: LoadingFacade
  ) {}

  public get cover(): string {
    if (!this.isStub) {
      return this.litresService.getCover(this.book.id, this.book.cover);
    }
  }

  public get currentTime(): number {
    return this.timeService.currentTime;
  }

  public showAll(): void {
    this.showAllEvent.emit();
  }

  public openDescription(): void {
    this.dataService.activeTvshow = null;
    this.dataService.activeVideo = null;
    this.loadingFacade.startLoading();
    this.litresService
      .getBooksInfo([this.book.id])
      .toPromise()
      .then((data) => {
        this.dataService.activeAudiobook = data[0];
        this.loadingFacade.stopLoading();
        this.router.navigate(['content-description', ContentName.BOOK]);
      });
  }
}
