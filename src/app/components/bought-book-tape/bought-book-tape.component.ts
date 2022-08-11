import { Router } from "@angular/router";
import { Component, Input } from "@angular/core";

import { Book } from "@models/core";

@Component({
  selector: "app-bought-book-tape",
  templateUrl: "bought-book-tape.component.html",
  styleUrls: ["bought-book-tape.component.scss"],
})
export class BoughtBookTapeComponent {
  @Input() books: Book[] = [];
  @Input() title = "Мои книги";
  @Input() isShowStub: boolean;

  constructor(private router: Router) {}

  public get isHaveBooks(): boolean {
    return this.books && this.books.length > 0;
  }

  public onShowAll(): void {
    this.router.navigate(["audiobooks"]);
  }
}
