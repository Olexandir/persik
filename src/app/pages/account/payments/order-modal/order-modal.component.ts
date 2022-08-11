import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PaymentInfo } from 'src/app/models/tariff';
import { KeyMap } from 'src/keymaps/keymap';

@Component({
  selector: 'app-order-modal',
  templateUrl: 'order-modal.component.html',
  styleUrls: ['order-modal.component.scss']
})

export class OrderModalComponent implements OnInit, OnDestroy {

  @Input() content: PaymentInfo;
  @Output() closeEvent = new EventEmitter<any>();

  private keyEventHandler: any;

  constructor() {}

  ngOnInit() {
    this.keyEventHandler = this.onKeyEvent.bind(this);
    document.addEventListener('keydown', this.keyEventHandler);
    this.focusOnClose();
  }

  public closeModal(): void {
    this.closeEvent.emit();
  }

  public get isHaveDescription(): boolean {
    return this.content && !!this.content.description;
  }

  public get isHavePaymentUrl(): boolean {
    return this.content && !!this.content.payment_page_url;
  }

  private onKeyEvent(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const keyCode = event.keyCode;
    switch (keyCode) {
      case KeyMap.ENTER:
        this.closeModal();
        break;
      case KeyMap.BACK:
        this.closeModal();
        break;
      default:
        break;
    }
  }

  private focusOnClose(): void {
    setTimeout(() => {
      const button = document.querySelector('.modal__close') as HTMLElement;
      button.focus();
    }, 100);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keyEventHandler);
  }
}
