import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PlayerControllerService } from '@services/core';
import { PlayerEvents } from '@models/core';

@Component({
  selector: 'app-error-message',
  templateUrl: 'error-message.component.html',
  styleUrls: ['error-message.component.scss']
})

export class ErrorMessageComponent implements OnInit, OnDestroy {

  public errorMessage = '';
  public isAuthNeeded: boolean;
  public isShowButton: boolean;
  private playerControllerSubscriber: Subscription;

  @Input() isCourse: boolean;

  constructor(private playerController: PlayerControllerService, private router: Router) { }

  ngOnInit() {
    this.playerControllerSubscriber = this.playerController.events.subscribe(ev => {
      this.playerEventsHandler(ev);
    });
    this.playerEventsHandler(this.playerController.events.getValue());
  }

  public get isShowError(): boolean {
    return this.errorMessage.length > 0;
  }

  public goToAuth(): void {
    this.router.navigate(['auth']);
  }

  public goToPayments(): void {
    if (this.isCourse) {
      this.router.navigate(['account/course-pay']);
    } else {
      this.router.navigate(['account/payments']);
    }
  }

  private playerEventsHandler(event): void {
    switch (event) {
      case PlayerEvents.PLAYER_ERROR_LOGIN:
        this.loginErrorHandler();
        break;

      case PlayerEvents.PLAYER_ERROR_SERVER:
        this.serverErrorHandler();
        break;

      case PlayerEvents.PLAYER_ERROR_SUBSCRIPTION:
        this.subscriptionErrorHandler();
        break;

      default:
        this.errorMessage = '';
        this.isShowButton = false;
        break;
    }
  }

  private serverErrorHandler(): void {
    this.errorMessage = 'Ошибка сервера';
    this.isShowButton = false;
  }

  private subscriptionErrorHandler(): void {
    this.errorMessage = 'Для просмотра необходимо приобрести подписку';
    this.isShowButton = true;
    this.isAuthNeeded = false;
    this.focusOnButton();
  }

  private loginErrorHandler(): void {
    this.errorMessage = 'Для просмотра необходима авторизация';
    this.isShowButton = true;
    this.isAuthNeeded = true;
    this.focusOnButton();
  }

  private focusOnButton(): void {
    setTimeout(() => {
      const button = document.querySelector('[nav-item]') as HTMLDivElement;
      if (button) {
        button.focus();
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.playerControllerSubscriber) {
      this.playerControllerSubscriber.unsubscribe();
    }
  }
}
