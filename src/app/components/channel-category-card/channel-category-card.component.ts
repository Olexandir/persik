import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Genre } from '@models/core';

@Component({
  selector: 'app-channel-category',
  templateUrl: 'channel-category-card.component.html',
  styleUrls: ['channel-category-card.component.scss']
})
export class ChannelCategoryComponent {
  @Input() category: Genre;
  @Input() chosenCategory: number;

  @Output() chosenCategoryIdChange = new EventEmitter();

  public chooseCategory(): void {
    this.chosenCategoryIdChange.emit(this.category.id);
  }
}
