import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { KeyMap } from '../../keymaps/keymap';

@Directive({
  selector: '[item-vertical]'
})

export class NavItemVerticalDirective {

  @Output() keyEnterEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() topBorderEvent = new EventEmitter<any>();
  @Output() bottomBorderEvent = new EventEmitter<any>();

  constructor(private element: ElementRef) {
    const el: HTMLElement = element.nativeElement;
    el.setAttribute('tabindex', '0');
  }

  /* @HostListener('mouseenter') onHover() {
    this.element.nativeElement.focus();
  } */

  @HostListener('focus') onItemFocus() {
    $(this.element.nativeElement).closest('[nav-group]').addClass('opened');
  }

  @HostListener('keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
    const key = event.keyCode;
    // const el: HTMLElement = this.element.nativeElement;
    const itemsInGroup = $(this.element.nativeElement).closest('[nav-group]').find('[nav-item]');
    const index = $(itemsInGroup).index($(this.element.nativeElement));
    let nextItem;
    switch (key) {
      case KeyMap.UP:
        if (index - 1 >= 0) {
          nextItem = $(itemsInGroup).eq(index - 1);
          $(itemsInGroup).each((_, item) => $(item).removeAttr('last'));
          $(nextItem).attr('last', true);
          nextItem.focus();
        } else {
          this.topBorderEvent.emit();
        }
        break;
      case KeyMap.DOWN:
        if (itemsInGroup.length > index + 1) {
          nextItem = $(itemsInGroup).eq(index + 1);
          $(itemsInGroup).each((_, item) => $(item).removeAttr('last'));
          $(nextItem).attr('last', true);
          nextItem.focus();
        } else {
          this.bottomBorderEvent.emit();
        }
        break;
      case KeyMap.RIGHT:
        this.jumpToRight();
        break;
      case KeyMap.LEFT:
        this.jumpToLeft();
        break;
      case KeyMap.ENTER:
        this.keyEnterEvent.emit();
        break;
    }
  }

  private jumpToRight(): void {
    // const navgroups = $(this.element.nativeElement).closest('[nav-container]').find('[nav-group]');
    // const currentGroupIndex = $(navgroups).index($(this.element.nativeElement).closest('[nav-group]'));
    // if (currentGroupIndex < navgroups.length - 1) {
    //   navgroups[currentGroupIndex + 1].focus();
    // } else {
    //   const allNavContainers = $('[nav-container]');
    //   const currentContainerIndex = $(allNavContainers).index($(this.element.nativeElement).closest('[nav-container]'));
    //   $(allNavContainers).eq(currentContainerIndex + 1).find('[nav-group]:eq(0)').focus();
    // }
    // $(navgroups[currentGroupIndex], '[last]').find('[last]').removeAttr('last');
    // this.element.nativeElement.setAttribute('last', 'true');

    const allNavContainers = $('[nav-container]');
    const currentContainerIndex = $(allNavContainers).index($(this.element.nativeElement).closest('[nav-container]'));
    const lastGroup =  $(allNavContainers).eq(currentContainerIndex + 1).find('[nav-group][last-group]');

    if (lastGroup.length > 0) {
      lastGroup[0].focus();
    } else {
      const navgroups = $(this.element.nativeElement).closest('[nav-container]').find('[nav-group]');
      const currentGroupIndex = $(navgroups).index($(this.element.nativeElement).closest('[nav-group]'));
      const nextGroup = navgroups[currentGroupIndex + 1];
      if (nextGroup) {
        nextGroup.focus();
      } else {
        $(allNavContainers).eq(currentContainerIndex + 1).find('[nav-group]:eq(0)').focus();
      }
    }

    $('[nav-group]').removeAttr('last-group');
    $(this.element.nativeElement).closest('[nav-group]').attr('last-group', true);
  }

  private jumpToLeft(): void {
    const navgroups = $(this.element.nativeElement).closest('[nav-container]').find('[nav-group]');
    const currentGroupIndex = $(navgroups).index($(this.element.nativeElement).closest('[nav-group]'));
    if (currentGroupIndex > 0) {
      navgroups[currentGroupIndex - 1].focus();
    } else {
      const allNavContainers = $('[nav-container]');
      const currentContainerIndex = $(allNavContainers).index($(this.element.nativeElement).closest('[nav-container]'));
      if (currentContainerIndex > 0) {
        $(allNavContainers).eq(currentContainerIndex - 1).find('[nav-group]:eq(0)').focus();
      }
    }
    $(navgroups[currentGroupIndex]).find('[last]').removeAttr('last');
    this.element.nativeElement.setAttribute('last', 'true');
  }

}
