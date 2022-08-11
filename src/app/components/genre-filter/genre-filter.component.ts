import { Genre } from '@models/core';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})

export class GenreFilterComponent {

  @Input() genres: Genre[];
  @Input() activeGenre: Genre;
  @Output() genreChange = new EventEmitter<Genre>();
  @Output() blurEvent = new EventEmitter<number>();

  constructor() { }

  public selectGenre(genre: Genre): void {
    if (this.activeGenre !== genre) {
      this.activeGenre = genre;
      this.genreChange.emit(this.activeGenre);
    }
  }

  public isGenreActive(genre: Genre): boolean {
    const isActive = this.activeGenre && genre ? this.activeGenre.id === genre.id : false;
    return isActive;
  }

  public onBlur(): void {
    const time = new Date().getTime();
    this.blurEvent.next(time);
  }
}
