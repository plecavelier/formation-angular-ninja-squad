import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { RaceModel } from './models/race.model';

@Injectable()
export class RaceService {

  constructor(private http: Http) { }

  list(): Observable<RaceModel[]> {
    return this.http.get('http://ponyracer.ninja-squad.com/api/races?status=PENDING')
      .map(result => result.json());
  }
}
