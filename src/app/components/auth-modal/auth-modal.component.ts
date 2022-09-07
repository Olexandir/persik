import { takeUntil } from 'rxjs/operators';
import { Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthUser } from '@models/core';
import { AuthService, DataService } from '@services/core';
import { Subject } from 'rxjs';
import { FavoritesFacade } from 'src/redux/favorite/favorite.facade';
import { LoadingFacade } from 'src/redux/loading/loading.facade';
import { emailValidator } from './validators/email-validator';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthModalComponent {
  @Output() closeModalWindowChange = new EventEmitter<boolean>();
  @Output() isAuthorisedChange = new EventEmitter<boolean>();

  public authForm: FormGroup;

  private unsubscription = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private favoritesFacade: FavoritesFacade,
    private loadingFacade: LoadingFacade
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

    this.setValidatorsForLogIn();

    // const regex = /^([a-zA-Z0-9._%\+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
    // this.authForm.valueChanges.pipe(takeUntil(this.unsubscription)).subscribe((data) => {
    //   if (regex.test(data.email)) {
    //     this.authService.checkEmail(data.email).then((res) => {
    //       if (res.exists) {
    //       }
    //     });
    //   }
    // });
  }

  private setValidatorsForLogIn(): void {
    this.authForm.controls['email'].setValidators([Validators.required, emailValidator()]);
    this.authForm.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
  }

  private authSuccess(result: AuthUser): void {
    this.authService.token = result.auth_token;
    this.authService.user_id = result.user_id;
    this.authService.sendAuthEvent(); // Говорим всем подпищикам что авторизация прошла успешно
    this.dataService.loadChannels();
    this.favoritesFacade.loadFavoritesData();
    // this.backService.goToMain();
    this.loadingFacade.stopLoading();
    this.closeModalWindowChange.emit(false);
  }

  ngOnDestroy(): void {
    this.unsubscription.next();
    this.unsubscription.complete();
  }
}
