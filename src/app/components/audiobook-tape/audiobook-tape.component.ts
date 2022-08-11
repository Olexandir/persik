import { Component, Input, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { FavoriteBook, Book } from "@models/core";
import { LitresService } from "@services/core";

@Component({
  selector: "app-audiobook-tape",
  templateUrl: "audiobook-tape.component.html",
  styleUrls: ["audiobook-tape.component.scss"],
})
export class AudiobookTapeComponent implements OnInit {
  @Input() favoriteBooks: FavoriteBook[] = [];
  @Input() title: string;

  public books: Observable<Book[]>;

  constructor(private litresService: LitresService) {}

  ngOnInit() {
    this.loadBooks();
  }

  public get isHaveTitle(): boolean {
    return this.title && this.title.length > 0;
  }

  public get isHaveIds(): boolean {
    return this.favoriteBooks.length > 0;
  }

  private loadBooks(): void {
    const ids = this.favoriteBooks.map((book) => book.litres_item_id);
    if (ids && ids.length > 0) {
      this.books = this.litresService.getBooksInfo(ids);
    }
  }
}
