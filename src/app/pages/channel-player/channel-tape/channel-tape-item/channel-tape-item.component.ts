import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Channel } from '@models/core';
import { PositionMemoryService } from '@services/core';

@Component({
  selector: 'app-channel-tape-item',
  templateUrl: './channel-tape-item.component.html',
  styleUrls: ['./channel-tape-item.component.scss']
})
export class ChannelTapeItemComponent {
  static activeChannelId: number;
  static focusChannelIndex: number;

  @Input()
  public channel: Channel;
  @Input()
  public index: number;

  @Output()
  public channelChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private memoryService: PositionMemoryService) {}

  public get isActive(): boolean {
    return ChannelTapeItemComponent.activeChannelId === this.channel.channel_id;
  }

  public get isFocus(): boolean {
    return ChannelTapeItemComponent.focusChannelIndex === this.index;
  }

  public selectChannel(): void {
    this.memoryService.currentChannel = this.channel;
    this.channelChange.next(this.channel.channel_id);
  }
}
