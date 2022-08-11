import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeyboardComponent } from './keyboard.component';
import { NavModule } from '../../directives/nav.module';

@NgModule({
  declarations: [
    KeyboardComponent
  ],
  imports: [
    CommonModule,
    NavModule
  ],
  exports: [
    KeyboardComponent
  ]
})

export class KeyboardModule {}
