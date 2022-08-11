import { NgModule } from '@angular/core';
import { CoursesPageComponent } from './courses.component';
import { CommonModule } from '@angular/common';
import { NavModule } from 'src/app/directives/nav.module';
import { VideoCardModule } from 'src/app/components/video-card/video-card.module';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    CoursesPageComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    VideoCardModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesPageComponent
      }
    ])
  ],
  exports: [
    CoursesPageComponent
  ]
})

export class CoursesPageModule {}
