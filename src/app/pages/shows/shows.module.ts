import { RouterModule } from '@angular/router';
import { NavModule } from 'src/app/directives/nav.module';
import { VideoCardModule } from './../../components/video-card/video-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowsPageComponent } from './shows.component';

@NgModule({
  declarations: [
    ShowsPageComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    VideoCardModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShowsPageComponent
      }
    ]),
  ],
  exports: [
    ShowsPageComponent
  ]
})

export class ShowsPageModule {}
