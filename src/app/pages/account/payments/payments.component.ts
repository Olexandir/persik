import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { DataService } from '@services/core';

import { LoadingFacade } from 'src/redux/loading/loading.facade';

import { Payment, PaymentInfo } from './../../../models/user';
import { PaymentType } from './../../../models/tariff';
import { Product, Option } from '../../../models/tariff';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss']
})
export class PaymentsPageComponent implements OnInit {
  public payments: PaymentType[] = [];
  private products: Product[] = [];
  public productMatrix: Product[][] = [];
  public options: Option[] = [];
  private selectedOption: Option;
  private selectedProduct: Product;

  public paymentInfo: PaymentInfo;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef, private loadingFacade: LoadingFacade) {}

  ngOnInit() {
    this.loadingFacade.startLoading();
    this.dataService
      .getTariffs()
      .then((data) => {
        this.products = data.products;
        this.createProductMatrix();
        this.payments = data.pay_sys;
        this.onProductSelect(this.products[0]);
      })
      .finally(() => {
        this.loadingFacade.stopLoading();
        this.cdr.markForCheck();
      });
  }

  public get isHavePaymentInfo(): boolean {
    return !!this.paymentInfo;
  }

  public onProductSelect(product: Product): void {
    this.options = [];
    this.options = this.products.find((pr) => pr.product_id === product.product_id).options;
    this.selectedProduct = product;
    this.selectedOption = this.selectedProduct.options[0];
    this.cdr.detectChanges();
  }

  public onOptionSelect(option: Option): void {
    this.selectedOption = option;
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  public get isOptionSelected(): boolean {
    return !!this.selectedOption;
  }

  public get isHaveOptions(): boolean {
    return this.options.length > 0;
  }

  public doPayment(paymentName: PaymentType): void {
    if (this.isOptionSelected && this.selectedProduct && paymentName) {
      this.loadingFacade.startLoading();
      const payment: Payment = {
        pay_sys: paymentName,
        product_option_id: [this.selectedOption.product_option_id]
      };
      this.dataService
        .createPayment(payment)
        .then((res) => {
          if (res) {
            this.paymentInfo = res;
          }
        })
        .catch((_) => {
          this.paymentInfo = {
            description: null,
            invoice_id: 0,
            payment_page_url: null,
            sms: null,
            user_id: null
          };
        })
        .finally(() => this.loadingFacade.stopLoading());
    }
  }

  public onModalClose(): void {
    this.paymentInfo = null;
    setTimeout(() => {
      const payways = document.querySelector('.payways') as HTMLElement;
      payways.focus();
    }, 100);
  }

  private createProductMatrix(): void {
    let row: Product[] = [];
    this.products.forEach((product, index) => {
      row.push(product);
      const step = index + 1;
      if (step % 2 === 0) {
        this.productMatrix.push(row);
        row = [];
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const paymentsPage = document.querySelector('.payments');
      paymentsPage.scrollTo(0, 10000);
    }, 100);
  }
}
