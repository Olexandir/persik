import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Channel } from '@models/core';

@Component({
  selector: 'app-tv-guide-channels',
  templateUrl: './tv-guide-channels.component.html',
  styleUrls: ['./tv-guide-channels.component.scss']
})
export class TvGuideChannelsComponent {
  @Input() channels: Channel[] = [];
  @Input() activeChannelId: number;
  @Output() focusChannel = new EventEmitter<Channel>();

  constructor(private router: Router) {}

  public isActiveChannel(id: number): boolean {
    return this.activeChannelId === id;
  }

  public onFocus(channel: Channel): void {
    if (channel.channel_id !== this.activeChannelId) {
      this.focusChannel.emit(channel);
    }
  }

  public openChannel(id: number): void {
    this.router.navigate(['channel-player', id]);
  }
}
