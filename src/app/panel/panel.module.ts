import{NgModule} from '@angular/core';
import {MessagesComponent} from './messages/messages.component';
import {StationsComponent} from './stations/stations.component';
import {CoreModule} from '../core/core.module';
import {CommonModule} from '@angular/common';
import {DetailsMessagesComponent} from './messages/details-messages/details-messages.component';
@NgModule({
  declarations: [
    MessagesComponent,
    StationsComponent,
    DetailsMessagesComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    DetailsMessagesComponent
  ]
})
export class PanelModule {
}
