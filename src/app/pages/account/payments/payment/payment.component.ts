import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaymentType, PaymentName } from 'src/app/models/tariff';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.scss']
})

export class PaymentComponent {

  @Input() paymentName: PaymentType;
  @Output() selectEvent = new EventEmitter<PaymentType>();

  constructor() { }

  public get name(): string {
    switch (this.paymentName) {
      case PaymentName.ASSIST:
        return 'Ассист';
      case PaymentName.ERIP:
        return 'ЕРИП';
      case PaymentName.LIFE:
        return 'Life :)';
      case PaymentName.MTS:
        return 'МТС';
      case PaymentName.YANDEX:
        return 'Яндекс';
      default:
        break;
    }
  }

  public get logo(): string {
    switch (this.paymentName) {
      case PaymentName.ASSIST:
        return 'assets/payments/credit-cards.svg';
      case PaymentName.ERIP:
        return 'assets/payments/erip.png';
      case PaymentName.LIFE:
        return 'assets/payments/life.png';
      case PaymentName.MTS:
        return 'assets/payments/mts.png';
      case PaymentName.YANDEX:
        return 'assets/payments/yandex.png';
      default:
        break;
    }
  }

  public onPaymentSelect(): void {
    this.selectEvent.emit(this.paymentName);
  }
}
