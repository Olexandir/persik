import { NavModule } from 'src/app/directives/nav.module';
import { VideoTapeModule } from 'src/app/components/video-tape/video-tape.module';
import { ChannelsTapeModule } from './../../components/channels-tape/channels-tape.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoritePageComponent } from './favorite.component';
import { RouterModule } from '@angular/router';
import { AudiobookTapeModule } from 'src/app/components/audiobook-tape/audiobook-tape.module';
import { BoughtBookTapeModule } from 'src/app/components/bought-book-tape/bought-book-tape.module';

@NgModule({
  declarations: [
    FavoritePageComponent
  ],
  imports: [
    CommonModule,
    ChannelsTapeModule,
    VideoTapeModule,
    AudiobookTapeModule,
    BoughtBookTapeModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoritePageComponent
      }
    ])
  ]
})

export class FavoritePageModule {}
