import { VideoCardModule } from 'src/app/components/video-card/video-card.module';
import { VideoTapeComponent } from './video-tape.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    VideoTapeComponent
  ],
  imports: [
    CommonModule,
    VideoCardModule
  ],
  exports: [
    VideoTapeComponent
  ]
})

export class VideoTapeModule {}
