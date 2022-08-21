import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-scrolling-button',
  templateUrl: 'scrolling-button.component.html',
  styleUrls: ['scrolling-button.component.scss']
})
export class ScrollingButtonComponent {
  @Output() public scroll = new EventEmitter<string>();

  public doScrollUp(): void {
    this.scroll.emit('up');
  }
}
