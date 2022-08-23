import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TvReviewPageComponent } from './tv-review.component';
import { RouterModule } from '@angular/router';
import { NavModule } from '../../directives/nav.module';
import { ChannelCardModule } from '../../components/channel-card/channel-card.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChannelsCategoriesContainerModule } from 'src/app/components/channels-categories-container/channels-categories-container.module';
import { FilterChannelsByCategoryPipe } from './filter-channels-by-category.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TvReviewPageComponent, FilterChannelsByCategoryPipe],
  imports: [
    CommonModule,
    NavModule,
    ChannelCardModule,
    ScrollingModule,
    InfiniteScrollModule,
    MatIconModule,
    ChannelsCategoriesContainerModule,
    RouterModule.forChild([
      {
        path: '',
        component: TvReviewPageComponent
      }
    ])
  ]
})
export class TvReviewPageModule {}
