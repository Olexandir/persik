import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { KeyboardItem, KeyboardSettings } from './keyboard.model';
import { getKeyboardLayout } from './matrix';
import { digitsMap } from 'src/keymaps/keymap';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KeyboardComponent implements OnInit, OnDestroy {

  @Input() settings: KeyboardSettings = {
    lang: 'ru',
    isUpper: false,
    needEmail: false
  };

  private buttonSize = 2.5; // rem
  public keyboardLayout: Array<KeyboardItem[]>;
  private numbersSubscription: any;
  private numbersMap = digitsMap;

  @Output() keyEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() topPositionEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.keyboardLayout = getKeyboardLayout(this.settings);
    this.numbersSubscription = this.keyboardNumbersHandler.bind(this);

    document.addEventListener('keydown', this.numbersSubscription);
  }

  public isAction(item: KeyboardItem): boolean {
    return item.action ? true : false;
  }

  public getSize(item: KeyboardItem): number {
    return item.size ? (item.size * this.buttonSize + item.size * 0.6 - 0.6) : this.buttonSize;
  }

  public onEnterPress(item: KeyboardItem): void {
    if (!item.action) {
      this.keyEvent.next(item.symbol);
    } else {
      switch (item.action) {
        case 'backspace':
          this.keyEvent.next(item.action);
          break;
        case 'upper':
          this.settings.isUpper = true;
          this.loadLayout();
          setTimeout(() => {
            document.getElementById('lower').focus();
          }, 50);
          break;
        case 'lower':
          this.settings.isUpper = false;
          this.loadLayout();
          setTimeout(() => {
            document.getElementById('upper').focus();
          }, 50);
          break;
        case 'en':
          this.settings.lang = 'en';
          this.loadLayout();
          setTimeout(() => {
            document.getElementById('ru').focus();
          }, 50);
          break;
        case 'ru':
          this.settings.lang = 'ru';
          this.loadLayout();
          setTimeout(() => {
            document.getElementById('en').focus();
          }, 50);
          break;
        case 'specSymbols':
          this.settings.lang = 'specSymbols';
          this.loadLayout();
          setTimeout(() => {
            document.getElementById('specSymbols').focus();
          }, 50);
          break;
        default:
          break;
      }
    }
  }

  public onTopPosition(): void {
    this.topPositionEvent.emit();
  }

  public onOKEvent(): void {
    this.keyEvent.next('OK');
  }

  private keyboardNumbersHandler(event: KeyboardEvent): void {
    const code = event.keyCode;
    if (this.numbersMap.includes(code)) {
      this.keyEvent.emit(this.numbersMap.indexOf(code).toString());
    }
  }

  private loadLayout(): void {
    this.keyboardLayout = getKeyboardLayout(this.settings);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.numbersSubscription);
  }
}

