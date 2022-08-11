import { NavModule } from 'src/app/directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VideoCardComponent } from './video-card.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    VideoCardComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    PipesModule
  ],
  exports: [
    VideoCardComponent
  ]
})

export class VideoCardModule {}
