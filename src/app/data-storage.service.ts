import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth/auth.service';


@Injectable()
export class DataStorageService {

  constructor(private http: Http, private authService: AuthService) {
  }

  getMessages() {
    return this.http.get('https://trainstation-720e3.firebaseio.com/hello.json')
      .map(
        (response: Response) => {
          console.log(response);
          return response.json();
        }
      );
  }

  editMessages(id, object, point) {
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/' + id + '.json' + '?auth=' + token, object, {headers: headers});
  }

  addMessage(object, point) {
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/.json' + '?auth=' + token, object, {headers: headers});
  }

  removeMessage(object, point) {
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/.json' + '?auth=' + token, object, {headers: headers});
  }

  getStations() {
    return this.http.get('https://trainstation-720e3.firebaseio.com/stations.json')
      .map(
        (response: Response) => {
          console.log(response);
          return response.json();
        }
      );
  }

}
