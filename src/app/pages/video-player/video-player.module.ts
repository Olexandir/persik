import { PlayerModule } from './../../components/player/player.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VideoPlayerPageComponent } from './video-player.component';
import { VideoControllerComponent } from './video-controller/video-controller.component';
import { TimePipe } from './video-controller/time.pipe';
import { CommonModule } from '@angular/common';
import { CastsPipe } from './video-controller/casts.pipe';
import { LastTimeModalComponent } from './last-time-modal/last-time-modal.component';

@NgModule({
  declarations: [
    VideoPlayerPageComponent,
    VideoControllerComponent,
    LastTimeModalComponent,
    TimePipe,
    CastsPipe
  ],
  imports: [
    CommonModule,
    PlayerModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideoPlayerPageComponent
      }
    ])
  ],
  exports: []
})

export class VideoPlayerPageModule {}
