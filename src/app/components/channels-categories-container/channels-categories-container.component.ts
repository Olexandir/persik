import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Genre } from 'src/app/models/category';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-channels-categories-container',
  templateUrl: 'channels-categories-container.component.html',
  styleUrls: ['channels-categories-container.component.scss']
})
export class ChannelsCategoriesContainerComponent implements OnInit {
  @Input()
  public chosenCategory: number;
  @Output()
  public chosenCategoryChange = new EventEmitter<number>();

  public channelsCategories$: Observable<Genre[]>;
  public isContainerOpened: boolean;

  constructor(private channelsFacade: ChannelsFacade) {}

  ngOnInit(): void {
    this.channelsCategories$ = this.channelsFacade.channelCategories$;
  }

  public toggleContainer(): void {
    this.isContainerOpened = !this.isContainerOpened;
  }

  public chooseCategory(categoryId: number): void {
    this.chosenCategoryChange.emit(categoryId);
  }
}
