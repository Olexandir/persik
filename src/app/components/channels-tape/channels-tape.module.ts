import { ChannelCardModule } from '../channel-card/channel-card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChannelsTapeComponent } from './channels-tape.component';

@NgModule({
  declarations: [
    ChannelsTapeComponent
  ],
  imports: [
    CommonModule,
    ChannelCardModule
  ],
  exports: [
    ChannelsTapeComponent
  ]
})

export class ChannelsTapeModule {}
