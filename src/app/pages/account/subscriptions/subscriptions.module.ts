import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubscriptionsPageComponent } from './subscriptions.component';
import { NavModule } from '../../../directives/nav.module';
import { SimpleDatePipe } from './simple-date.pipe';
import { ExpiredPipe } from './expired.pipe';

@NgModule({
  declarations: [
    SubscriptionsPageComponent,
    SimpleDatePipe,
    ExpiredPipe
  ],
  imports: [
    CommonModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscriptionsPageComponent
      }
    ])
  ]
})

export class SubscriptionsPageModule {}
