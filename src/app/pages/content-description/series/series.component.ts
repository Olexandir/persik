import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DataService } from '@services/core';
import { Video, Episode } from '@models/core';
import { LoadingFacade } from 'src/redux/loading/loading.facade';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  @Input() video: Video;
  public activeSeason: string;
  public seasons: string[];
  public seriesVideoInformation$: Observable<Video[]>;
  @Output() playEvent = new EventEmitter<Video>();

  constructor(private dataService: DataService, private loadingFacade: LoadingFacade) {}

  ngOnInit(): void {
    const allSeasons = this.video.episodes.map((item) => item.season);
    const uniqueSeasons = Array.from(new Set(allSeasons));

    this.seasons = uniqueSeasons;
  }

  public isActiveSeason(season: string): boolean {
    return season === this.activeSeason;
  }

  public loadSeriesBySeason(season: string): void {
    // Получение серий по номеру сезона
    if (this.activeSeason !== season) {
      // предотвращаем повторную загрузку того же контента
      this.activeSeason = season;
      const series = this.video.episodes
        .filter((item) => item.season === this.activeSeason)
        .sort((a, b) => {
          return +a.episode.split(' ')[1] - +b.episode.split(' ')[1];
        });
      this.loadInfo(series);
    } else {
      this.activeSeason = null;
    }
  }

  public playVideo(video: Video): void {
    this.playEvent.emit(video);
  }

  private loadInfo(series: Episode[]): void {
    const serieIds: (string | number)[] = series.map((s) => (s.tvshow_id ? s.tvshow_id.toString() : s.video_id));
    this.loadingFacade.startLoading();
    this.seriesVideoInformation$ = this.dataService.getVideosInfo(serieIds).pipe(
      map((info) => {
        const seriesVideoInformation = info.map((item) => {
          const name = series.find((sr) => {
            const id = sr.tvshow_id ? sr.tvshow_id : sr.video_id;
            const itemId = item.tvshow_id ? item.tvshow_id : item.video_id;
            return id === itemId;
          }).episode;

          return { ...item, name };
        });

        return seriesVideoInformation;
      }),
      finalize(() => this.loadingFacade.stopLoading())
    );
  }
}
