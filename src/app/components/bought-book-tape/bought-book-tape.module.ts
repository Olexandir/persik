import { NavModule } from './../../directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoughtBookTapeComponent } from './bought-book-tape.component';
import { AudiobookCardModule } from '../audiobook-card/audiobook-card.module';

@NgModule({
  declarations: [
    BoughtBookTapeComponent
  ],
  imports: [
    CommonModule,
    AudiobookCardModule,
    NavModule
  ],
  exports: [
    BoughtBookTapeComponent
  ]
})

export class BoughtBookTapeModule { }
