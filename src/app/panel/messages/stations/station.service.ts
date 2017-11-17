import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {AuthService} from '../../../auth/auth.service';

const apiEndpoint = 'https://trainstation-720e3.firebaseio.com/stations';

@Injectable()
export class StationService {
  token;

  constructor(private http: Http, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  editMessages(id, object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(apiEndpoint + '/' + id + '.json' + '?auth=' + this.token, object, {headers: headers});
  }

  addMessage(object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(apiEndpoint + '.json' + '?auth=' + this.token, object, {headers: headers});
  }

  removeMessage(object) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(apiEndpoint + '.json' + '?auth=' + this.token, object, {headers: headers});
  }

  getStations() {
    return this.http.get(apiEndpoint + '.json')
      .map(
        (response: Response) => {
          console.log(response);
          return response.json();
        }
      );
  }

}
