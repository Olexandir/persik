import { NavModule } from './../../directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountPageComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { InfoPageComponent } from './info/info.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    InfoPageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'main',
            pathMatch: 'full'
          },
          {
            path: 'main',
            component: InfoPageComponent
          },
          {
            path: 'subscriptions',
            loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsPageModule)
          },
          {
            path: 'payments',
            loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsPageModule)
          },
          {
            path: 'course-pay',
            loadChildren: () => import('./course-pay/course-pay.module').then(m => m.CoursePayPageModule)
          },
          {
            path: 'book-pay',
            loadChildren: () => import('./book-pay/book-pay.module').then(m => m.BookPayPageModule)
          }
        ]
      }
    ])
  ]
})

export class AccountPageModule {}
