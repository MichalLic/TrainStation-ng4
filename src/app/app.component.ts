import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDnFOLw9rBfNCfyldt02rTwsX-uhDRiEio',
      authDomain: 'trainstation-720e3.firebaseapp.com',
    });
  }
}
