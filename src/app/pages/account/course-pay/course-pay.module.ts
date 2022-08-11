import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoursePayPageComponent } from './course-pay.component';

@NgModule({
  declarations: [
    CoursePayPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursePayPageComponent
      }
    ])
  ]
})

export class CoursePayPageModule { }
