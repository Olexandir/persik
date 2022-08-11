import { KeyMap } from "./../../../../keymaps/keymap";
import {
  Component,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
} from "@angular/core";

@Component({
  selector: "app-last-time-modal",
  templateUrl: "./last-time-modal.component.html",
  styleUrls: ["./last-time-modal.component.scss"],
})
export class LastTimeModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() lastTime: number;
  @Output() resumeEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("ok_button")
  public okButton: ElementRef<HTMLDivElement>;
  @ViewChild("cancel_button")
  public cancelButton: ElementRef<HTMLDivElement>;
  private keyboardEventHandler: any;

  constructor() {}

  ngOnInit() {
    this.keyboardEventHandler = this.onKeydownEvent.bind(this);
    document.addEventListener("keydown", this.keyboardEventHandler);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cancelButton.nativeElement.focus();
    }, 0);
  }

  public resumePlay(): void {
    this.resumeEvent.next(true);
  }

  public startPlay(): void {
    this.resumeEvent.next(false);
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

      /* case KeyMap.BACK:
        this.resumeEvent.next(true);
        break; */

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
        if (button.getAttributeNames().includes("ok-button")) {
          this.resumePlay();
        } else {
          this.startPlay();
        }
        break;
    }
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy() {
    document.removeEventListener("keydown", this.keyboardEventHandler);
    const item = document.querySelector(".page [nav-item]") as HTMLElement;
    if (item) {
      item.focus();
    }
  }
}
