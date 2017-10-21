import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from './panel/messages/messages.component';
import {StationsComponent} from './panel/stations/stations.component';

const appRoutes: Routes = [
  {path: 'messages', component: MessagesComponent},
  {path: 'stations', component: StationsComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
