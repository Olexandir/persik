import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavModule } from '../../directives/nav.module';
import { ChannelCardComponent } from './channel-card.component';
import { TitlePipe } from './title.pipe';
import { ProgressPipe } from './progress.pipe';
@NgModule({
  declarations: [ChannelCardComponent, TitlePipe, ProgressPipe],
  imports: [CommonModule, NavModule],
  exports: [ChannelCardComponent]
})
export class ChannelCardModule {}
