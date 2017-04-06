import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const input = { login, password, birthYear };
    return this.http.post('http://ponyracer.ninja-squad.com/api/users', input)
      .map(result => result.json());
  }
}
