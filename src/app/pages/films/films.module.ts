import { NavModule } from 'src/app/directives/nav.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilmsPageComponent } from './films.component';
import { RouterModule } from '@angular/router';
import { VideoCardModule } from 'src/app/components/video-card/video-card.module';

@NgModule({
  declarations: [
    FilmsPageComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    VideoCardModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: FilmsPageComponent
      }
    ])
  ]
})

export class FilmsPageModule {}
