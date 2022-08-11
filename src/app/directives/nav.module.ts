import { NavItemVerticalDirective } from './nav-item-vertical.directive';
import { NavItemHorizontalDirective } from './nav-item-horizontal.directive';
import { NavGroupDirective } from './nav-group.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    NavGroupDirective,
    NavItemHorizontalDirective,
    NavItemVerticalDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavGroupDirective,
    NavItemHorizontalDirective,
    NavItemVerticalDirective
  ]
})

export class NavModule {}
