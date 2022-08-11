import { NavModule } from 'src/app/directives/nav.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaymentsPageComponent } from './payments.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OptionComponent } from './option/option.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    PaymentsPageComponent,
    ProductComponent,
    OptionComponent,
    PaymentComponent,
    OrderModalComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    QRCodeModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentsPageComponent
      }
    ])
  ]
})

export class PaymentsPageModule { }
