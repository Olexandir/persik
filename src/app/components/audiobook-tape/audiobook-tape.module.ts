import { NavModule } from 'src/app/directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AudiobookTapeComponent } from './audiobook-tape.component';
import { AudiobookCardModule } from '../audiobook-card/audiobook-card.module';

@NgModule({
  declarations: [
    AudiobookTapeComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    AudiobookCardModule
  ],
  exports: [
    AudiobookTapeComponent
  ]
})

export class AudiobookTapeModule { }
