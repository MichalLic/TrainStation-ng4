import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  navLinks = [
    {id: 'messages', name: 'Messages'},
    {id: 'signin', name: 'Sign in'},
    {id: 'signup', name: 'Sign up'},
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLogged.subscribe(
      (data: boolean) => {
        this.isLogged = data;
        console.log(data);
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.isLogged = false;
  }

}
