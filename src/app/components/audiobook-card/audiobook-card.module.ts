import { NavModule } from 'src/app/directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AudiobookCardComponent } from './audiobook-card.component';

@NgModule({
  declarations: [
    AudiobookCardComponent
  ],
  imports: [
    CommonModule,
    NavModule
  ],
  exports: [
    AudiobookCardComponent
  ]
})

export class AudiobookCardModule { }
