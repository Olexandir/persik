import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { DataService, AuthService, PlayerControllerService } from '@services/core';
import { ContentName, Channel, Tvshow } from '@models/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnChanges, OnInit, OnDestroy {
  @Input() tvshow: Tvshow;
  @Input() channel: Channel;
  private channelId: number;
  public description = 'Нет описания';
  public errorMessage = 'Для просмотра канала необходимо авторизоваться';

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private playerController: PlayerControllerService,
    private loadingFacade: LoadingFacade
  ) {}

  ngOnInit() {
    this.playerController.setThumbnailMode();
  }

  ngOnChanges() {
    if (this.tvshow) {
      this.loadTvshowInfo();
    }
    if (this.channel) {
      this.playChannel();
    }
  }

  public get isAuth(): boolean {
    return this.authService.isLogin;
  }

  public get isAdult(): boolean {
    if (this.channel) {
      return this.channel.age_rating.includes('18');
    }
    return true;
  }

  private playChannel(): void {
    if (this.channel.channel_id !== this.channelId) {
      this.playerController.play(this.channel.channel_id, ContentName.CHANNEL);
      this.channelId = this.channel.channel_id;
    }
  }

  private loadTvshowInfo(): void {
    this.loadingFacade.startLoading();
    this.dataService
      .getVideoInfo(this.tvshow.video_id)
      .pipe(finalize(() => this.loadingFacade.startLoading()))
      .subscribe((response) => {
        const descr = response.description;
        if (descr && descr.length > 5) {
          this.description = response.description;
        } else {
          this.description = 'Нет описания';
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.playerController.setFullscreenMode();
    this.playerController.stop();
  }
}
