import { takeUntil } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthUser } from '@models/core';
import { AuthService, DataService } from '@services/core';
import { Subject } from 'rxjs';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  @Output() closeModalWindowChange = new EventEmitter<boolean>();

  public authForm: FormGroup;

  private unsubscription = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.createAuthForm();
  }

  public closeModalWindow(): void {
    this.closeModalWindowChange.emit(false);
  }

  public logIn(): void {
    // что добавить ?
    const userLoginData = this.authForm.getRawValue();
    const { email, password } = userLoginData;
    this.authService.login(email, password).then((res) => {
      this.authSuccess(res);
    });
  }

  private createAuthForm(): void {
    // что добавить ?
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
    const regex = /^([a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
    this.authForm.valueChanges.pipe(takeUntil(this.unsubscription)).subscribe((data) => {
      if (regex.test(data.email)) {
        console.log(true);
        this.authService.checkEmail(data.email).then((res) => {
          if (res.exists) {
            console.log('email существует');
          }
        });
      }
    });
  }

  private authSuccess(result: AuthUser): void {
    this.authService.token = result.auth_token;
    this.authService.user_id = result.user_id;
    this.authService.sendAuthEvent(); // Говорим всем подпищикам что авторизация прошла успешно
    this.dataService.loadChannels();
    this.favoritesFacade.loadFavoritesData();
    // this.backService.goToMain();
    this.closeModalWindowChange.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }
}
