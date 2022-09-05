// import { KeyMap } from './../../keymaps/keymap';
// import { Directive, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';
// import * as $ from 'jquery';

// @Directive({
//   selector: '[item-horizontal]'
// })

// export class NavItemHorizontalDirective {

//   @Output() keyEnterEvent: EventEmitter<number> = new EventEmitter<number>();
//   @Output() topBorderEvent: EventEmitter<any> = new EventEmitter<any>();
//   @Output() bottomBorderEvent: EventEmitter<any> = new EventEmitter<any>();
//   @Input('item-horizontal') behavior = 'last'; // first

//   constructor(private element: ElementRef) {
//     const el: HTMLElement = element.nativeElement;
//     el.setAttribute('tabindex', '0');
//   }

//   @HostListener('mouseenter') onHover() {
//     this.element.nativeElement.focus();
//   }

//   @HostListener('keydown', ['$event']) onKeyPress(event: KeyboardEvent) {
//     const key = event.keyCode;
//     const el: HTMLElement = this.element.nativeElement;
//     const itemsInGroup = $(this.element.nativeElement).closest('[nav-group]').find('[nav-item]');
//     let index = $(itemsInGroup).index($(this.element.nativeElement));
//     const currentGroup = $(this.element.nativeElement).closest('[nav-group]');
//     const allGroups = $(currentGroup).closest('[nav-container]').find('[nav-group]');
//     const currentGroupIndex = $(allGroups).index(currentGroup);
//     let nextItem;
//     switch (key) {
//       case KeyMap.LEFT:
//         if (index - 1 >= 0) {
//           nextItem = $(itemsInGroup).eq(index - 1);
//           nextItem.focus();
//           this.scrollTapeItemIntoView(nextItem);
//         } else {
//           this.jumpToLeft();
//         }
//         break;
//       case KeyMap.RIGHT:
//         if (itemsInGroup.length > index + 1) {
//           nextItem = $(itemsInGroup).eq(index + 1);
//           nextItem.focus();
//           this.scrollTapeItemIntoView(nextItem);
//         } else {
//           this.jumpToRight();
//         }
//         break;
//       case KeyMap.DOWN: {
//         if (currentGroupIndex < allGroups.length - 1) {
//           const allItems = $(allGroups[currentGroupIndex + 1]).find('[nav-item]');
//           const lastItem = this.behavior === 'last' ? $(allItems).filter('[last]') : [];
//           if (lastItem[0]) {
//             lastItem[0].focus();
//             this.scrollToCenter(lastItem[0]);
//           } else {
//             if (this.behavior === 'first') {
//               index = 0;
//             }
//             if ($(allItems).eq(index).length !== 0) {
//               nextItem = $(allItems).eq(index);
//               nextItem.focus();
//               this.scrollToCenter(nextItem[0]);
//             } else {
//               nextItem = $(allItems).eq($(allItems).length - 1);
//               nextItem.focus();
//               this.scrollToCenter(nextItem[0]);
//             }
//           }
//         } else {
//           this.bottomBorderEvent.emit();
//         }
//         $('[nav-group]').removeAttr('last-group');
//         $(this.element.nativeElement).closest('[nav-group]').attr('last-group', true);
//         break;
//       }

//       case KeyMap.UP: {
//         if (currentGroupIndex > 0) {
//           const allItems = $(allGroups[currentGroupIndex - 1]).find('[nav-item]');
//           const lastItem = this.behavior === 'last' ? $(allItems).filter('[last]') : [];
//           if (lastItem[0]) {
//             lastItem[0].focus();
//             this.scrollToCenter(lastItem[0]);
//           } else {
//             if (this.behavior === 'first') {
//               index = 0;
//             }
//             if ($(allItems).eq(index).length !== 0) {
//               nextItem = $(allItems).eq(index);
//               nextItem.focus();
//               this.scrollToCenter(nextItem[0]);
//             } else {
//               nextItem = $(allItems).eq($(allItems).length - 1);
//               nextItem.focus();
//               this.scrollToCenter(nextItem[0]);
//             }
//           }
//         } else {
//           this.topBorderEvent.emit();
//         }
//         $('[nav-group]').removeAttr('last-group');
//         $(this.element.nativeElement).closest('[nav-group]').attr('last-group', true);
//         break;
//       }

//       case KeyMap.ENTER: {
//         this.keyEnterEvent.emit();
//         break;
//       }
//     }
//     $('[last]').removeAttr('last');
//     el.setAttribute('last', 'true');
//   }

//   private jumpToLeft(): void {
//     const allNavContainers = $('[nav-container]');
//     const currentContainerIndex = $(allNavContainers).index($(this.element.nativeElement).closest('[nav-container]'));
//     const lastGroup = $(allNavContainers).eq(currentContainerIndex - 1).find('[nav-group][last-group]');
//     if (lastGroup.length > 0) {
//       lastGroup[0].focus();
//     } else {
//       $(allNavContainers).eq(currentContainerIndex - 1).find('[nav-group]:eq(0)').focus();
//     }
//     $('[nav-group]').removeAttr('last-group');
//     $(this.element.nativeElement).closest('[nav-group]').attr('last-group', true);
//   }

//   private jumpToRight(): void {
//     const allNavContainers = $('[nav-container]');
//     const currentContainerIndex = $(allNavContainers).index($(this.element.nativeElement).closest('[nav-container]'));
//     const lastGroup = $(allNavContainers).eq(currentContainerIndex + 1).find('[nav-group][last-group]');
//     if (lastGroup.length > 0) {
//       lastGroup[0].focus();
//     } else {
//       $(allNavContainers).eq(currentContainerIndex + 1).find('[nav-group]:eq(0)').focus();
//     }
//     $('[nav-group]').removeAttr('last-group');
//     $(this.element.nativeElement).closest('[nav-group]').attr('last-group', true);
//   }

//   private scrollToCenter(item: HTMLElement): void {
//     if (item) {
//       setTimeout(() => {
//         /* if (this.isIncludeFirstTape(item)) {
//           document.querySelector('.page').scrollTo(0, 0);
//           return;
//         } */
//         item.scrollIntoView({ block: 'start' });
//       }, 300);
//     }
//   }

//   private isIncludeFirstTape(item: HTMLElement): boolean {
//     if (item && item.classList) {
//       if (item.classList.contains('first-tape')) {
//         return true;
//       } else {
//         if (item.parentNode) {
//           return this.isIncludeFirstTape(item.parentNode as HTMLElement);
//         }
//       }
//     }
//     return false;
//   }

//   private scrollTapeItemIntoView(item) {
//     // ---- this code only for channels tape correct view scroll navigation (note: for work need attribute on sroll tape)
//     const horizontalTape = $(item).closest('[horizontalTape]');
//     if (horizontalTape) {
//       // horizontalTape[0].scrollLeft = nextItem[0].offsetLeft - 2 * $(nextItem).width();
//       $(horizontalTape).animate({ scrollLeft: item[0].offsetLeft - 2 * $(item).width() });
//     }
//     // ----------------------------------------
//   }

// }
