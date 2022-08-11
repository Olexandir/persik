import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()

export class MenuControlService {
  public menuController: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  public isCertificateMode(): Promise<boolean> {
    return this.http.get('http://test1.persik.by/api/toggle').pipe(map((data: { toggle: boolean }) => data.toggle )).toPromise();
  }

  public hideMenu(): void {
    this.menuController.next(false);
  }

  public showMenu(): void {
    this.menuController.next(true);
  }
}
