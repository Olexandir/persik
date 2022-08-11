import { BackService } from '@services/core';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountPageComponent implements OnInit, OnDestroy {

  private backServiceSubscriber: Subscription;

  constructor(private backService: BackService) { }

  ngOnInit() {
    this.backServiceSubscriber = this.backService.backEvent.subscribe(_ => {
      this.backService.goToMain();
    });
  }

  ngOnDestroy() {
    if (this.backServiceSubscriber) {
      this.backServiceSubscriber.unsubscribe();
    }
  }

}
