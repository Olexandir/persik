import { Channel } from './../models/channel';
import { Injectable } from '@angular/core';

@Injectable()
export class PositionMemoryService {

  private positions: Position[];
  private _currentChannel: Channel;

  constructor() { }

  private loadPositions(): void {
    if (!this.positions) {
      this.positions = JSON.parse(localStorage.getItem('positions'));
      if (!this.positions) {
        this.positions = [];
      }
    }
  }

  getPosition(contentId: number): number {
    this.loadPositions();
    const searchPosition = this.positions.find(item => item.contentId === contentId);
    if (searchPosition) {
      return searchPosition.time;
    }
    return null;
  }

  setPosition(position: Position): void {
    this.loadPositions();
    if (position.time > 5) { // 5 minimal time for save in localstorage
      const searchPosition = this.positions.find(item => item.contentId === position.contentId);
      if (searchPosition) {
        searchPosition.time = position.time;
      } else {
        this.positions.unshift(position);
      }
      localStorage.setItem('positions', JSON.stringify(this.positions));
    }
  }

  removePosition(contentId: any): void {
    this.loadPositions();
    const removedPosition = this.positions.find(item => item.contentId === contentId);
    if (removedPosition) {
      const index = this.positions.indexOf(removedPosition);
      this.positions.splice(index, 1);
      localStorage.setItem('positions', JSON.stringify(this.positions));
    }
  }

  clearPositions(): void { // Периодическая чистка массива сохраненных позиций
    this.loadPositions();
    const positionsSize = this.positions.length;
    if (positionsSize > 20) {
      this.positions = this.positions.slice(0, 10);
      localStorage.setItem('positions', JSON.stringify(this.positions));
    }
  }

  set currentChannel(channel: Channel) {
    this._currentChannel = channel;
  }

  get currentChannel(): Channel {
    return this._currentChannel;
  }

  clearCurrentChannel(): void {
    this._currentChannel = null;
  }

}


export interface Position {
  contentId: any;
  time: number;
}
