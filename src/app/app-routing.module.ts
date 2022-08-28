import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tv-review',
    pathMatch: 'full'
  },
  {
    path: 'tv-review',
    loadChildren: () => import('./pages/tv-review/tv-review.module').then(m => m.TvReviewPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: 'channel-player/:id',
    loadChildren: () => import('./pages/channel-player/channel-player.module').then(m => m.ChannelPlayerPageModule)
  },
  {
    path: 'video-player/:type/:id',
    loadChildren: () => import('./pages/video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  // {
  //   path: 'tv-guide',
  //   loadChildren: () => import('./pages/tv-guide/tv-guide.module').then(m => m.TvGuideModule)
  // },
  // {
  //   path: 'films',
  //   loadChildren: () => import('./pages/films/films.module').then(m => m.FilmsPageModule)
  // },
  // {
  //   path: 'series',
  //   loadChildren: () => import('./pages/series/series.module').then(m => m.SeriesPageModule)
  // },
  // {
  //   path: 'cartoons',
  //   loadChildren: () => import('./pages/cartoons/cartoons.module').then(m => m.CartoonsPageModule)
  // },
  // {
  //   path: 'shows',
  //   loadChildren: () => import('./pages/shows/shows.module').then(m => m.ShowsPageModule)
  // },
  // {
  //   path: 'courses',
  //   loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesPageModule)
  // },
  // {
  //   path: 'content-description/:type',
  //   loadChildren: () => import('./pages/content-description/content-description.module').then(m => m.ContentDescriptionPageModule)
  // },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  // },
  // {
  //   path: 'favorite',
  //   loadChildren: () => import('./pages/favorite/favorite.module').then(m => m.FavoritePageModule)
  // },
  // {
  //   path: 'audiobooks',
  //   loadChildren: () => import('./pages/audiobooks/audiobooks.module').then(m => m.AudiobooksPageModule)
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
