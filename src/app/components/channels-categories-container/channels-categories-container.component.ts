import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Genre } from 'src/app/models/category';
import { ChannelsFacade } from 'src/redux/channels/channels.facade';

@Component({
  selector: 'app-channels-categories-container',
  templateUrl: 'channels-categories-container.component.html',
  styleUrls: ['channels-categories-container.component.scss']
})
export class ChannelsCategoriesContainerComponent implements OnInit {
  public channelsCategories$: Observable<Genre[]>;

  public isContainerOpened: boolean;

  constructor(private channelsFacade: ChannelsFacade) {}

  ngOnInit(): void {
    this.channelsCategories$ = this.channelsFacade.channelCategories$;
  }

  public toggleContainer(): void {
    this.isContainerOpened = !this.isContainerOpened;
    console.log(this.isContainerOpened);
    
  }
}
