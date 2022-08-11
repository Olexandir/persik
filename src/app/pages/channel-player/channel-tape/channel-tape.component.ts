import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';

import { Channel } from '@models/core';
import { PositionMemoryService } from '@services/core';

import { KeyMap } from '../../../../keymaps/keymap';
import { ChannelTapeItemComponent } from './channel-tape-item/channel-tape-item.component';
import * as scrollIV from 'scroll-into-view';

@Component({
  selector: 'app-channel-tape',
  templateUrl: './channel-tape.component.html',
  styleUrls: ['./channel-tape.component.scss']
})
export class ChannelTapeComponent implements OnInit, OnDestroy {
  @Input()
  public channels: Channel[];
  @Output()
  public changeChannel: EventEmitter<number> = new EventEmitter<number>();

  private keydownEventHandler: any;

  constructor(private memoryService: PositionMemoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const activeChannel = this.channels.find((ch) => ch.channel_id === ChannelTapeItemComponent.activeChannelId);
    ChannelTapeItemComponent.focusChannelIndex = this.channels.indexOf(activeChannel);
    setTimeout(() => {
      this.scrollToView();
    }, 1000);
    this.keydownEventHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keydownEventHandler);
  }

  public onChannelChange(id: number): void {
    this.changeChannel.next(id);
  }

  public trackByChannelId(index: number, channel: Channel): number {
    return channel.channel_id;
  }

  private onKeyDown(event: KeyboardEvent): void {
    const code = event.keyCode;
    switch (code) {
      case KeyMap.UP:
        this.navigateUp();
        break;

      case KeyMap.DOWN:
        this.navigateDown();
        break;

      case KeyMap.ENTER:
        this.selectChannel();
        break;

      default:
        break;
    }
  }

  private navigateUp(): void {
    const currentIndex = ChannelTapeItemComponent.focusChannelIndex;
    if (currentIndex > 0) {
      ChannelTapeItemComponent.focusChannelIndex = currentIndex - 1;
      this.scrollToView();
    }
  }

  private navigateDown(): void {
    const currentIndex = ChannelTapeItemComponent.focusChannelIndex;
    if (currentIndex < this.channels.length - 1) {
      ChannelTapeItemComponent.focusChannelIndex = currentIndex + 1;
      this.scrollToView();
    }
  }

  private selectChannel(): void {
    const focusChannel = this.channels[ChannelTapeItemComponent.focusChannelIndex];
    if (focusChannel) {
      this.memoryService.currentChannel = focusChannel;
      this.onChannelChange(focusChannel.channel_id);
    }
  }

  private scrollToView(): void {
    const item = document.querySelector('.channel_focus');
    if (item) {
      setTimeout(() => {
        scrollIV(item);
      }, 100);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keydownEventHandler);
  }
}
