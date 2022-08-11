import { Product } from './../../../../models/tariff';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})

export class ProductComponent {

  public static selectedProduct: Product;

  @Input() product: Product;
  @Output() selectEvent = new EventEmitter<Product>();

  constructor() { }

  public selectProduct(): void {
    ProductComponent.selectedProduct = this.product;
    this.selectEvent.emit(this.product);
  }

  public get isProductSelect(): boolean {
    if (ProductComponent.selectedProduct) {
      return this.product.product_id === ProductComponent.selectedProduct.product_id;
    }
  }

}
