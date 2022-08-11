import { NavModule } from 'src/app/directives/nav.module';
import { VideoCardModule } from 'src/app/components/video-card/video-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeriesPageComponent } from './series.component';

@NgModule({
  declarations: [
    SeriesPageComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    VideoCardModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: SeriesPageComponent
      }
    ]),
  ],
  exports: [
    SeriesPageComponent
  ]
})

export class SeriesPageModule {}
