import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TvReviewPageComponent } from './tv-review.component';
import { RouterModule } from '@angular/router';
import { NavModule } from '../../directives/nav.module';
import { ChannelCardModule } from '../../components/channel-card/channel-card.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    TvReviewPageComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    ChannelCardModule,
    ScrollingModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: TvReviewPageComponent
      }
    ])
  ]
})

export class TvReviewPageModule {}
