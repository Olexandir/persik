import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { ContentName, BookFile, Book } from "@models/core";
import { LitresService } from "@services/core";

@Component({
  selector: "app-chapters",
  templateUrl: "chapters.component.html",
  styleUrls: ["chapters.component.scss"],
})
export class ChaptersComponent {
  @Input() book: Book;

  public isOpened: boolean;

  constructor(private router: Router, private litresService: LitresService) {}

  public playChapter(chapter: BookFile): void {
    this.router.navigate(["video-player", ContentName.BOOK, this.book.id], {
      queryParams: {
        cover: this.litresService.getCover(this.book.id, this.book.cover),
        stream: chapter.stream,
      },
    });
  }

  public toggleChapters(): void {
    this.isOpened = !this.isOpened;
  }

  public get chapters(): BookFile[] {
    return this.book.file_groups[1].files;
  }
}
