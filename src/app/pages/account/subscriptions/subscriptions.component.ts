import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/core';
import { UserSubscription } from '@models/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsPageComponent implements OnInit {
  public subscriptions: UserSubscription[] = [];

  constructor(private authService: AuthService, private loadingFacade: LoadingFacade) {}

  ngOnInit() {
    this.loadUserSubscriptions();
  }

  public get isHaveSubscriptions(): boolean {
    return this.subscriptions.length > 0;
  }

  private loadUserSubscriptions(): void {
    this.loadingFacade.startLoading();
    this.authService
      .getUserSubscriptions()
      .then((res) => {
        this.subscriptions = res;
      })
      .finally(() => this.loadingFacade.stopLoading());
  }
}
