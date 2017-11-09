import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from './panel/messages/messages.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';

const appRoutes: Routes = [
  {path: 'messages', component: MessagesComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
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
