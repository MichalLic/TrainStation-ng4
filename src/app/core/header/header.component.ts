import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  navLinks = [
    {id: 'messages', name: 'Messages'},
    {id: 'signin', name: 'Sign in'},
    {id: 'signup', name: 'Sign up'},
  ];

  constructor() {
  }

  ngOnInit() {

  }

}
