import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export namespace AdultCheckState {
  export const SUCCESS = 'SUCCESS';
  export const CANCELED = 'CANCELED';
}

export type AdultCheckType = 'CHECK' | 'SUCCESS' | 'CANCELED';

@Injectable()
export class AdultService {

  public adultEvent = new Subject<AdultCheckType>();

  constructor() {}

  public checkPinSuccess(): void {
    this.adultEvent.next(AdultCheckState.SUCCESS);
  }

  public checkPinCanceled(): void {
    this.adultEvent.next(AdultCheckState.CANCELED);
  }

}



