import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {DataStorageService} from '../data-storage.service';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DataStorageService
  ]
})
export class CoreModule {
}
