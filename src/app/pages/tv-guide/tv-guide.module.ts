import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavModule } from '../../directives/nav.module';

import { TvGuideComponent } from './tv-guide.component';
import { TvGuideChannelsComponent } from './components/tv-guide-channels/tv-guide-channels.component';
import { TvGuideDatesComponent } from './components/tv-guide-dates/tv-guide-dates.component';
import { TvGuideShowsComponent } from './components/tv-guide-shows/tv-guide-shows.component';
import { ShowItemComponent } from './components/show-item/show-item.component';
import { PreviewComponent } from './components/preview/preview.component';
import { BoldPipe } from './pipes/bold.pipe';
import { DatePipe } from './pipes/date.pipe';
import { TimePipe } from './pipes/time.pipe';
import { UniqueDatesPipe } from './pipes/unique-dates.pipe';
import { CurrentDateTvshowsPipe } from './pipes/current-date-tvshows.pipe';

@NgModule({
  declarations: [
    TvGuideComponent,
    TvGuideChannelsComponent,
    TvGuideDatesComponent,
    TvGuideShowsComponent,
    ShowItemComponent,
    PreviewComponent,
    DatePipe,
    TimePipe,
    BoldPipe,
    UniqueDatesPipe,
    CurrentDateTvshowsPipe
  ],
  imports: [
    CommonModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: TvGuideComponent
      }
    ])
  ]
})

export class TvGuideModule {}
