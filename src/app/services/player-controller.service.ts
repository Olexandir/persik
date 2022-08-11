import { Subject, BehaviorSubject } from 'rxjs';
import { ContentType } from '@models/core';
import { Injectable } from '@angular/core';

@Injectable()

export class PlayerControllerService {

  public events = new BehaviorSubject<string>(null);
  public actions = new Subject<any>();
  private player: HTMLVideoElement;


  constructor() { }

  play(id: number | string, type: ContentType, cover?: string, stream?: string) {
    this.actions.next({ name: 'play', id, type, cover, stream });
  }

  stop() {
    this.actions.next({ name: 'stop' });
  }

  pause() {
    this.actions.next({ name: 'pause' });
  }

  updateChannelId(id: number) {
    this.actions.next({ name: 'updateChannelId', id });
  }

  seek(value: number) {
    this.actions.next({ name: 'seek', value });
  }

  resume() {
    this.actions.next({ name: 'resume' });
  }

  setInstance(player: HTMLVideoElement) {
    this.player = player;
  }

  setFullscreenMode() {
    this.actions.next({ name: 'setFullscreen' });
  }

  setThumbnailMode() {
    this.actions.next({ name: 'setThumbnail' });
  }

  get currentTime(): number {
    return this.player.currentTime;
  }

  get duration(): number {
    return this.player.duration;
  }
}
