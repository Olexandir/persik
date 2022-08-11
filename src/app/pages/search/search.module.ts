import { BoughtBookTapeModule } from './../../components/bought-book-tape/bought-book-tape.module';
import { KeyboardModule } from './../../components/keyboard/keyboard.module';
import { NavModule } from 'src/app/directives/nav.module';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChannelsTapeModule } from '../../components/channels-tape/channels-tape.module';
import { VideoTapeModule } from 'src/app/components/video-tape/video-tape.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    KeyboardModule,
    ChannelsTapeModule,
    VideoTapeModule,
    BoughtBookTapeModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchPageComponent
      }
    ])
  ]
})

export class SearchPageModule {}
