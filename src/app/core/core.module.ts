import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {DataStorageService} from '../data-storage.service';
import {AuthService} from '../auth/auth.service';
import {AuthGuardService} from '../auth/auth-guard.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataStorageService,
    AuthService,
    AuthGuardService
  ]
})
export class CoreModule {
}
