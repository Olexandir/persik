import { environment } from './../../environments/environment.prod';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  get device(): string {
    const envDevice = environment.platform;
    switch (envDevice) {
      case 'android':
        return 'android-by';
      case 'samsung':
        return 'samsung-by';
      case 'lg':
        return 'lg-by';
      default:
        return 'web-by';
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const paramReq = req.clone({
      params: req.params
        .set('auth_token', this.authService.token)
        .set('uuid', this.authService.uuid)
        .set('device', this.device)
    });
    return next.handle(paramReq);
  }
}
