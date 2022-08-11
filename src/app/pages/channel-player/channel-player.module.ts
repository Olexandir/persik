import { PlayerModule } from 'src/app/components/player/player.module';
import { AdultModule } from './../../components/adult/adult.module';
import { ChannelTapeComponent } from './channel-tape/channel-tape.component';
import { ChannelPlayerComponent } from './channel-player.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChannelTapeItemComponent } from './channel-tape/channel-tape-item/channel-tape-item.component';
import { RouterModule } from '@angular/router';
import { OnairLineComponent } from './onair-line/onair-line.component';
import { TimePipe } from './time.pipe';


@NgModule({
  declarations: [
    ChannelPlayerComponent,
    ChannelTapeComponent,
    ChannelTapeItemComponent,
    OnairLineComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    AdultModule,
    PlayerModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChannelPlayerComponent
      }
    ])
  ]
})

export class ChannelPlayerPageModule {

}
