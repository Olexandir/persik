import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { ContentType, Category, ContentId } from '@models/core';

import { VodFacade } from 'src/redux/vod/vod.facade';

@Component({
  selector: 'app-video-tape',
  templateUrl: 'video-tape.component.html',
  styleUrls: ['video-tape.component.scss']
})
export class VideoTapeComponent implements OnInit {
  @Input() tape: ContentId[];
  @Input() type: ContentType;
  @Input() redirectPath: string;
  @Input() isLast: boolean;
  @Input() title: string;
  @Input() countInRow = 5;

  private categories: Category[];

  constructor(private router: Router, private vodFacade: VodFacade) {}

  ngOnInit(): void {
    this.vodFacade.vodCategories$.pipe(first((vodCategories) => !!vodCategories.length)).subscribe((vodCategories) => {
      this.categories = vodCategories;
    });
  }

  public onShowAll(): void {
    if (this.redirectPath) {
      this.router.navigate([this.redirectPath], { queryParams: { genre: this.getRedirectGenre() } });
    }
  }

  private getRedirectGenre(): string {
    switch (this.redirectPath) {
      case 'films':
        return JSON.stringify(
          this.categories.find((cat) => Number(cat.id) === 1).genres.find((g) => Number(g.id) === 881)
        );

      case 'cartoons':
        return JSON.stringify(
          this.categories.find((cat) => Number(cat.id) === 3).genres.find((g) => Number(g.id) === 890)
        );

      case 'series':
        return JSON.stringify(
          this.categories.find((cat) => Number(cat.id) === 2).genres.find((g) => Number(g.id) === 886)
        );
      default:
        return null;
    }
  }
}
