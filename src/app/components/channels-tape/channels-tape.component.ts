import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Channel } from '@models/core';
import { TimeService, DataService } from '@services/core';

@Component({
  selector: 'app-channels-tape',
  templateUrl: 'channels-tape.component.html',
  styleUrls: ['channels-tape.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsTapeComponent implements OnInit {
  @Input() public channels: Channel[];

  @Input() public stub: boolean;
  @Input() public title: string;

  public currentTime: number;

  constructor(private router: Router, private timeService: TimeService, private dataService: DataService) {}

  ngOnInit(): void {
    this.currentTime = this.timeService.currentTime;
  }

  public onShowAll(): void {
    this.dataService.activeGenreId = 0;
    this.router.navigate(['home']);
  }
}
