import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChannelCategoryComponent } from '../channel-category-card/channel-category-card.component';
import { ChannelsCategoriesContainerComponent } from './channels-categories-container.component';

@NgModule({
  declarations: [ChannelsCategoriesContainerComponent, ChannelCategoryComponent],
  imports: [CommonModule],
  exports: [ChannelsCategoriesContainerComponent]
})
export class ChannelsCategoriesContainerModule {}
