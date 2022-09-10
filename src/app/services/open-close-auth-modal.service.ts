import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class OpenCloseAuthModalService {
  public isAuthModalOpen$ = new Subject<boolean>();

  public openAuthModal(): void {
    this.isAuthModalOpen$.next(true);
  }

  public closeAuthModal(): void {
    this.isAuthModalOpen$.next(false);
  }
}
