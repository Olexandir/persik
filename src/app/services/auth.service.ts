import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser, UserInfo, UserSubscription } from '@models/core';

@Injectable()
export class AuthService {

  private BASE_URL = 'https://api.persik.by/';

  public loginStateEvent = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  checkEmail(email: string): Promise<EmailCheck> {
    const params: HttpParams = new HttpParams().set('email', email);
    return this.http.get<EmailCheck>(this.BASE_URL.concat('v2/auth/check'), { params }).toPromise();
  }

  login(email: string, password: string): Promise<AuthUser> {
    const params: HttpParams = new HttpParams().set('email', email).set('password', password);
    return this.http.post<AuthUser>(this.BASE_URL.concat('v1/account/login'), {}, { params }).toPromise();
  }

  register(email: string, password: string): Promise<any> {
    const params: HttpParams = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.post<AuthUser>(this.BASE_URL.concat('v1/account/registration'), {}, { params })
      .toPromise();
  }

  logout() {
    this.token = '';
    this.user_id = '';
    this.sendAuthEvent();
  }

  getAccountInfo(): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(this.BASE_URL.concat('v1/account/info'));
  }

  getUserSubscriptions(): Promise<UserSubscription[]> {
    return this.http.get<UserSubscription[]>(this.BASE_URL.concat('v2/billing/subscriptions')).toPromise();
  }

  sendAuthEvent(): void {
    this.loginStateEvent.next(this.isLogin);
  }

  get uuid(): string {
    return this.user_id;
  }

  get isLogin(): boolean {
    if (this.token.length > 0 && this.user_id.length > 0) {
      return true;
    }
    return false;
  }

  set token(token: string) {
    if (token.length > 0) {
      localStorage.setItem('user_token', token);
    } else {
      localStorage.removeItem('user_token');
    }
  }

  get token(): string {
    const token = localStorage.getItem('user_token');
    if (token) {
      return token;
    }
    return '';
  }

  set user_id(id: string) {
    if (id.length > 0) {
      localStorage.setItem('user_id', id);
    } else {
      localStorage.removeItem('user_id');
    }
  }

  get user_id(): string {
    const id = localStorage.getItem('user_id');
    if (id) {
      return id;
    }
    return '';
  }
}

interface EmailCheck {
  name?: string;
  exists: boolean;
}
