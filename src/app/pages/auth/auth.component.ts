import { Subscription } from 'rxjs';
import { KeyboardSettings } from './../../components/keyboard/keyboard.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, BackService, DataService } from '@services/core';
import { AuthUser } from '@models/core';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-auth',
  templateUrl: './auth_old.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {
  public title = 'Авторизация';
  private email: string;
  private password: string;
  public field = '';
  public isEmailValid = true;
  public isPasswordValid = true;
  public step = 'authEmail'; // authPath, registerPass, confirmPass

  private keydownEventHandler: any;
  private backServiceSubscriber: Subscription;

  public keyboardSettings: KeyboardSettings = {
    lang: 'en',
    isUpper: false,
    needEmail: true
  };

  constructor(
    private authService: AuthService,
    private backService: BackService,
    private dataService: DataService,
    private favoritesFacade: FavoritesFacade,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.focusOnFirst();
    this.backServiceSubscriber = this.backService.backEvent.subscribe((_) => {
      this.navigateBack();
    });
  }

  private checkEmail(): void {
    this.isEmailValid = true;
    const regex = /^([a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
    this.loadingFacade.startLoading();
    if (regex.test(this.field)) {
      this.authService
        .checkEmail(this.field)
        .then((res) => {
          if (res.exists) {
            this.email = this.field;
            this.field = '';
            this.step = 'authPass';
          } else {
            this.email = this.field;
            this.field = '';
            this.title = 'Регистрация';
            this.step = 'registerPass';
          }
        })
        .finally(() => this.loadingFacade.stopLoading());
    } else {
      this.isEmailValid = false;
    }
  }

  private login(): void {
    this.loadingFacade.startLoading();
    this.authService
      .login(this.email, this.field)
      .then((res) => {
        this.authSuccess(res);
      })
      .catch((_) => {
        this.isPasswordValid = false;
      })
      .finally(() => this.loadingFacade.stopLoading());
  }

  public onKeyboardEvent(key: string): void {
    switch (key) {
      case 'Backspace':
      case 'backspace':
        if (this.field.length > 0) {
          this.field = this.field.slice(0, -1);
        }
        break;

      case 'Enter':
      case 'OK':
        this.nextStep();
        break;

      case 'Shift':
      case 'Control':
      case 'Alt':
      case 'Tab':
        break;

      default:
        this.field += key;
        break;
    }
  }

  public keyboardKeyPress(event: KeyboardEvent): void {
    this.onKeyboardEvent(event.key);
  }

  private nextStep(): void {
    switch (this.step) {
      case 'authEmail':
        this.checkEmail();
        break;

      case 'authPass':
        this.login();
        break;

      case 'registerPass':
        this.checkCorrectPassword();
        break;

      case 'confirmPass':
        this.checkPassMatch();
        break;

      default:
        break;
    }
  }

  private checkCorrectPassword(): void {
    if (this.field.length >= 6) {
      this.password = this.field;
      this.field = '';
      this.step = 'confirmPass';
      this.isPasswordValid = true;
    } else {
      this.isPasswordValid = false;
    }
  }

  private checkPassMatch(): void {
    if (this.password === this.field) {
      this.register();
    } else {
      this.isPasswordValid = false;
    }
  }

  private register(): void {
    this.loadingFacade.startLoading();
    this.authService
      .register(this.email, this.password)
      .then((_) => {
        this.login();
      })
      .finally(() => this.loadingFacade.stopLoading());
  }

  private authSuccess(result: AuthUser) {
    this.authService.token = result.auth_token;
    this.authService.user_id = result.user_id;
    this.authService.sendAuthEvent(); // Говорим всем подпищикам что авторизация прошла успешно
    this.dataService.loadChannels();
    this.favoritesFacade.loadFavoritesData();
    this.backService.goToMain();
  }

  private navigateBack(): void {
    switch (this.step) {
      case 'authEmail':
        this.backService.goToMain();
        break;

      case 'authPass':
        this.step = 'authEmail';
        this.field = this.email;
        break;

      case 'registerPass':
        this.step = 'authEmail';
        this.field = this.email;
        break;

      case 'confirmPass':
        this.step = 'registerPass';
        this.field = '';
        break;

      default:
        break;
    }
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.page [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.backServiceSubscriber) {
      this.backServiceSubscriber.unsubscribe();
    }
    document.removeEventListener('keydown', this.keydownEventHandler);
  }
}
