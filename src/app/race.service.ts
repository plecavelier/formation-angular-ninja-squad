import { Injectable } from '@angular/core';

import { RaceModel } from './models/race.model';

@Injectable()
export class RaceService {

  constructor() { }

  list(): RaceModel[] {
    return [
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ];
  }
}