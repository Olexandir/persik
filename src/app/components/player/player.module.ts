import { NavModule } from './../../directives/nav.module';
import { PlayerComponent } from './player.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    PlayerComponent,
    ErrorMessageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NavModule
  ],
  exports: [
    PlayerComponent,
    ErrorMessageComponent
  ]
})

export class PlayerModule {}
