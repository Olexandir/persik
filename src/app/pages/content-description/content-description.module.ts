import { DurationTimePipe } from './duration-time.pipe';
import { CastsPipe } from './cast.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentDescriptionPageComponent } from './content-description.component';
import { CommonModule } from '@angular/common';
import { NavModule } from 'src/app/directives/nav.module';
import { StartTimePipe } from './start-time.pipe';
import { SeriesComponent } from './series/series.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    ContentDescriptionPageComponent,
    CastsPipe,
    StartTimePipe,
    SeriesComponent,
    DurationTimePipe,
    ChaptersComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContentDescriptionPageComponent
      }
    ])
  ],
  exports: [
    ContentDescriptionPageComponent
  ]
})

export class ContentDescriptionPageModule {}
