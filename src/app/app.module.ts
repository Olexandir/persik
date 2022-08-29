import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from './components/header/header.module';
import { PlayerModule } from './components/player/player.module';
import { ConnectionInfoComponent } from './components/connection-info/connection-info.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { LoopingRhumbusesSpinnerModule } from 'angular-epic-spinners';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

import { NavModule } from './directives/nav.module';
import { ExitModalComponent } from './components/exit-modal/exit-modal.component';

import {
  TimeService,
  ImageService,
  DataService,
  AuthService,
  BackService,
  MenuControlService,
  ParamInterceptor,
  AdultService,
  PlayerControllerService,
  PositionMemoryService
} from '@services/core';

import { FavoriteService } from './services/favorite.service';
import { GenreFilterModule } from './components/genre-filter/genre-filter.module';
import { appEffects, appReducers } from 'src/redux';
import { EffectsModule } from '@ngrx/effects';

import { AuthModalComponent } from './components/auth-modal/auth-modal.component';

@NgModule({
  declarations: [AppComponent, AuthModalComponent, MainMenuComponent, ExitModalComponent, ConnectionInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    LoopingRhumbusesSpinnerModule,
    GenreFilterModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    FormsModule,
    NavModule,
    PlayerModule,
    HeaderModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    DataService,
    ImageService,
    TimeService,
    AdultService,
    FavoriteService,
    PlayerControllerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    MenuControlService,
    BackService,
    PositionMemoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
