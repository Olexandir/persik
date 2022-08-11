import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartoonsPageComponent } from './cartoons.component';
import { NavModule } from '../../directives/nav.module';
import { VideoCardModule } from '../../components/video-card/video-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartoonsPageComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    VideoCardModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartoonsPageComponent
      }
    ])
  ],
  exports: [
    CartoonsPageComponent
  ]
})

export class CartoonsPageModule {}
