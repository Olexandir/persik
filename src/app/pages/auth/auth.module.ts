import { KeyboardModule } from './../../components/keyboard/keyboard.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthPageComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavModule } from 'src/app/directives/nav.module';
import { PlaceholderPipe } from './placeholder.pipe';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  declarations: [
    AuthPageComponent,
    PlaceholderPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NavModule,
    KeyboardModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent
      }
    ])
  ]
})

export class AuthPageModule {}
