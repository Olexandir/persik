import { environment } from './../../../environments/environment.prod';
import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
} from '@angular/core';
import { KeyMap } from '../../../keymaps/keymap';
declare var tizen;

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.scss'],
})
export class ExitModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() cancelEvent = new EventEmitter<void>();
  @ViewChild('ok_button')
  public okButton: ElementRef<HTMLDivElement>;
  @ViewChild('cancel_button')
  public cancelButton: ElementRef<HTMLDivElement>;
  private keyboardEventHandler: any;

  constructor() { }

  ngOnInit() {
    this.keyboardEventHandler = this.onKeydownEvent.bind(this);
    document.addEventListener('keydown', this.keyboardEventHandler);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cancelButton.nativeElement.focus();
    }, 300);
  }

  public confirmExit(): void {
    if (environment.platform === 'samsung') {
      tizen.application.getCurrentApplication().exit();
    }
    if (environment.platform === 'android') {
      navigator['app'].exitApp();
    }
    window.close();
  }

  public cancelExit(): void {
    this.cancelEvent.next();
  }

  private onKeydownEvent(event: KeyboardEvent): void {
    const code = event.keyCode;
    switch (code) {
      case KeyMap.LEFT:
        this.okButton.nativeElement.focus();
        break;

      case KeyMap.RIGHT:
        this.cancelButton.nativeElement.focus();
        break;

      case KeyMap.BACK:
        this.cancelEvent.next();
        break;

      case KeyMap.ENTER:
        // GetAttributeNames Polyfill ---------------------
        if (Element.prototype.getAttributeNames === undefined) {
          Element.prototype.getAttributeNames = function () {
            const attributes = this.attributes;
            const length = attributes.length;
            const result = new Array(length);
            for (let i = 0; i < length; i++) {
              result[i] = attributes[i].name;
            }
            return result;
          };
        }
        // ------------------------------------------------
        const button = event.target as HTMLElement;
        if (button.getAttributeNames().includes('ok-button')) {
          this.confirmExit();
        } else {
          this.cancelExit();
        }
        break;
    }
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keyboardEventHandler);
    const item = document.querySelector('.page [nav-item]') as HTMLElement;
    item.focus();
  }
}
