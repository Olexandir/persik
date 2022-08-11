import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements AfterViewInit {

  public menuItems: MenuItem[] = [
    {
      name: 'Аккаунт',
      path: 'main'
    },
    {
      name: 'Подписки',
      path: 'subscriptions'
    },
    {
      name: 'Покупки',
      path: 'payments'
    }
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.focusOnFirst();
  }

  public goTo(path: string): void {
    this.router.navigate([`account/${path}`]);
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.menu');
      if (elem) {
        elem.focus();
      }
    }, 200);
  }
}

interface MenuItem {
  name: string;
  path: string;
}
