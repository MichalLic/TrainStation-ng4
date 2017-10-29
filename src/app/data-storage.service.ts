import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataStorageService {

  constructor(private http: Http) {
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
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/' + id + '.json', object, {headers: headers});
  }

  addMessage(object, point) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/.json', object, {headers: headers});
  }

  removeMessage(object, point) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://trainstation-720e3.firebaseio.com/' + point + '/.json', object, {headers: headers});
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
