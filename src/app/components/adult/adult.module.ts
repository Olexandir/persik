import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdultComponent } from './adult.component';
import { FormsModule } from '@angular/forms';
import { NavModule } from '../../directives/nav.module';

@NgModule({
  declarations: [
    AdultComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    FormsModule
  ],
  exports: [
    AdultComponent
  ]
})

export class AdultModule {}
