import{NgModule} from '@angular/core';
import {MessagesComponent} from './messages/messages.component';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import {DetailsMessagesComponent} from './messages/details-messages/details-messages.component';
import {StationsComponent} from './messages/stations/stations.component';
@NgModule({
  declarations: [
    MessagesComponent,
    DetailsMessagesComponent,
    StationsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MomentModule
  ],
  exports: [
    DetailsMessagesComponent,
    StationsComponent
  ]
})
export class PanelModule {
}
