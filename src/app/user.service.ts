import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  userEvents = new Subject<UserModel>();

  constructor(private http: Http) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const input = { login, password, birthYear };
    return this.http.post('http://ponyracer.ninja-squad.com/api/users', input)
      .map(result => result.json());
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post('http://ponyracer.ninja-squad.com/api/users/authentication', credentials)
      .map(result => result.json())
      .do(user => {
        this.userEvents.next(user);
      });
  }
}
