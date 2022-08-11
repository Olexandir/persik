import { ContentName, Banner } from '@models/core';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataService, LoaderService } from '@services/core';
import { KeyMap } from '../../../../keymaps/keymap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.scss']
})

export class BannerComponent implements OnInit, OnDestroy {

  private readonly changeInterval = 6000;
  @Input() banners: Banner[];
  public activeIndex = 0;
  public isFocused: boolean;

  private intervalTimer: any;
  private keyboardEvent: any;

  constructor(private dataService: DataService, private router: Router, private loaderService: LoaderService) { }


  ngOnInit() {
    this.keyboardEvent = this.onKeyboardChangeSlide.bind(this);
    this.autoSlideBanners();
  }

  public autoSlideBanners(): void {
    this.intervalTimer = setInterval(() => {
      this.nextSlide();
    }, this.changeInterval);
  }

  public onBannerFocus(): void {
    this.isFocused = true;
    document.addEventListener('keydown', this.keyboardEvent);
  }

  public onBannerBlur(): void {
    this.isFocused = false;
    document.removeEventListener('keydown', this.keyboardEvent);
  }

  public getIsActive(index: number): boolean {
    return this.activeIndex === index;
  }

  public openBanner(): void {
    const currentBanner: Banner = this.banners[this.activeIndex];
    if (currentBanner.element_type === ContentName.VIDEO) {
      this.loaderService.startLoading(1);
      this.dataService.getVideoInfo(+currentBanner.element_id).then(res => {
        this.dataService.activeVideo = res;
        this.router.navigate(['content-description', currentBanner.element_type]);
      }).finally(() => this.loaderService.loadFinished());
    }
    if (currentBanner.element_type === ContentName.TV) {
      this.dataService.getTvshowInfo(currentBanner.element_id.toString()).then(res => {
        this.dataService.activeTvshow = res;
        if (res) {
          this.loaderService.startLoading(1);
          this.dataService.getVideoInfo(+res.video_id).then(result => {
            this.dataService.activeVideo = result;
            this.router.navigate(['content-description', currentBanner.element_type]);
          }).finally(() => this.loaderService.loadFinished());
        }
      });
    }
    if (currentBanner.element_type === ContentName.CHANNEL) {
      this.router.navigate(['channel-player', currentBanner.element_id]);
    }
  }

  private onKeyboardChangeSlide(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case KeyMap.RIGHT:
        this.nextSlide();
        break;

      default:
        break;
    }

  }

  private nextSlide(): void {
    const bannersLength = this.banners.length;
    clearInterval(this.intervalTimer);
    if (this.activeIndex < bannersLength - 1) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
    this.autoSlideBanners();
  }

  ngOnDestroy() {
    clearInterval(this.intervalTimer);
  }
}
