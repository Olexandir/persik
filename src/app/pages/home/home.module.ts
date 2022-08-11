import { BoughtBookTapeModule } from 'src/app/components/bought-book-tape/bought-book-tape.module';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { VideoCardModule } from '../../components/video-card/video-card.module';
import { NavModule } from './../../directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ChannelsTapeModule } from '../../components/channels-tape/channels-tape.module';
import { VideoTapeModule } from '../../components/video-tape/video-tape.module';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    // VideoCardModule,
    // InfiniteScrollModule,
    ChannelsTapeModule,
    VideoTapeModule,
    BoughtBookTapeModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ]
})

export class HomePageModule {}
