import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenreFilterComponent } from './genre-filter.component';
import { NavModule } from '../../directives/nav.module';

@NgModule({
  declarations: [
    GenreFilterComponent
  ],
  imports: [
    CommonModule,
    NavModule
  ],
  exports: [
    GenreFilterComponent
  ]
})

export class GenreFilterModule {}
