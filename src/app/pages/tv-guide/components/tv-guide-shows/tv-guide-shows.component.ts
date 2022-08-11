import { Subscription } from 'rxjs';
import { Tvshow } from '@models/core';
import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TimeService } from '@services/core';

@Component({
  selector: 'app-tv-guide-shows',
  templateUrl: './tv-guide-shows.component.html',
  styleUrls: ['./tv-guide-shows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TvGuideShowsComponent implements OnInit, OnDestroy {

  @Input() tvshows: Tvshow[] = [];
  @Input() dvr: number;
  @Output() focusTvshow = new EventEmitter<Tvshow>();
  public currentTime: number;

  private currentTimeController: Subscription;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.currentTime = this.timeService.currentTime;
    this.currentTimeController = this.timeService.timeController.subscribe(time => {
      this.currentTime = time;
    });
  }

  public get isHaveData(): boolean {
    return this.tvshows.length > 0;
  }

  public onTvshowFocus(tvshow: Tvshow): void {
    this.focusTvshow.emit(tvshow);
  }

  ngOnDestroy() {
    if (this.currentTimeController) {
      this.currentTimeController.unsubscribe();
    }
  }

}
