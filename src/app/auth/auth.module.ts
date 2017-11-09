import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {AppRoutingModule} from '../app.routing.module';
import {CommonModule} from '@angular/common';
@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],

})
export class AuthModule {
}
