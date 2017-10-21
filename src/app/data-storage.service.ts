import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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

  editMessages(id, object) {
    return this.http.put('https://trainstation-720e3.firebaseio.com/hello/' + id + '.json', object);
  }


}
