import { finalize } from 'rxjs/operators';
import { digitsMap } from 'src/keymaps/keymap';
import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { AuthService, AdultService } from '@services/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-adult',
  templateUrl: './adult.component.html',
  styleUrls: ['./adult.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdultComponent implements AfterViewInit, OnInit, OnDestroy {
  public code = '';
  public isWrongPin: boolean;
  public numberMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, '<-'], ['ОК'], ['Отмена']];

  private numbersMap = digitsMap;
  private numberEventsSubscription: any;

  constructor(
    private authService: AuthService,
    private adultService: AdultService,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.numberEventsSubscription = this.numbersEventHandler.bind(this);
    document.addEventListener('keydown', this.numberEventsSubscription);
  }

  ngAfterViewInit() {
    this.focusOnFirst();
  }

  private focusOnFirst(): void {
    setTimeout(() => {
      const elem: HTMLElement = document.querySelector('.adult [nav-group]');
      if (elem) {
        elem.focus();
      }
    }, 100);
  }

  public clickButton(num: any) {
    switch (num) {
      case '<-':
        this.isWrongPin = false;
        if (this.code.length > 0) {
          this.code = this.code.slice(0, -1);
        }
        break;

      case 'ОК':
        this.checkIsValid();
        break;

      case 'Отмена':
        this.adultService.checkPinCanceled();
        break;

      default:
        this.isWrongPin = false;
        this.code += num.toString();
        break;
    }
  }

  private numbersEventHandler(event: KeyboardEvent): void {
    const code = event.keyCode;
    if (this.numbersMap.includes(code)) {
      this.clickButton(this.numbersMap.indexOf(code).toString());
    }
  }

  private checkIsValid(): void {
    this.loadingFacade.startLoading();
    this.authService
      .getAccountInfo()
      .pipe(finalize(() => this.loadingFacade.stopLoading()))
      .subscribe((info) => {
        if (this.code === info.pass_code) {
          this.adultService.checkPinSuccess();
        } else {
          this.isWrongPin = true;
        }
      });
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.numberEventsSubscription);
  }
}
