import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookPayPageComponent } from './book-pay.component';

@NgModule({
  declarations: [
    BookPayPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookPayPageComponent
      }
    ])
  ]
})

export class BookPayPageModule { }
