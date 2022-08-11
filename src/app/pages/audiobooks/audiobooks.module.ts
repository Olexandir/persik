import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AudiobookCardModule } from 'src/app/components/audiobook-card/audiobook-card.module';
import { NavModule } from './../../directives/nav.module';

import { AudiobooksPageComponent } from './audiobooks.component';

@NgModule({
  declarations: [AudiobooksPageComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    AudiobookCardModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: AudiobooksPageComponent
      }
    ])
  ]
})
export class AudiobooksPageModule {}
