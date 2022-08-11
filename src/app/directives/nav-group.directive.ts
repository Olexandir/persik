import { Directive, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[nav-group]'
})

export class NavGroupDirective {

  private focusTimer: any;
  private readonly focusAttemptCount = 8;

  constructor(private element: ElementRef) {
    const el: HTMLElement = element.nativeElement;
    el.setAttribute('tabindex', '0');
  }

  @HostListener('focus') onGroupFocus() {
    $('.opened').removeClass('opened');
    this.element.nativeElement.classList.add('opened');
    if (!this.focusOnLast()) {
      if (!this.focusOnActive()) {
        if (!this.focusOnFirst()) {
          let counter = 0 ;
          this.focusTimer = setInterval(() => {
            if (counter < this.focusAttemptCount && !this.focusOnFirst()) {
              counter++;
              console.log('Attempt #', counter);
            } else {
              clearInterval(this.focusTimer);
              this.focusOnFirstItem();
              console.log('Atempts is end');
            }
          }, 1000);
          this.focusOnFirstItem();
        }
      }
    }
  }

  private focusOnLast(): boolean {
    const lastItem = $(this.element.nativeElement).find('[nav-item][last]');
    if (lastItem.length > 0) {
      lastItem[0].focus();
      return true;
    }
    return false;
  }

  private focusOnActive(): boolean {
    const activeItem = $(this.element.nativeElement).find('.active');
    if (activeItem.length > 0) {
      activeItem[0].focus();
      return true;
    }
    return false;
  }

  private focusOnFirst(): boolean {
    const firstItem = $(this.element.nativeElement).find('[nav-item]:eq(0)');
    if (firstItem[0]) {
      firstItem[0].focus();
      return true;
    }
    return false;
  }

  private focusOnFirstItem(): void {
    const firstItem = $('.page [nav-group]');
    if (firstItem[0]) {
      firstItem[0].focus();
    }
  }
}
