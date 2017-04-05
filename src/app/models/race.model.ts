import { PonyModel } from './pony.model';

export interface RaceModel {

  id: number;
  name: string;
  startInstant: string;
  ponies: PonyModel[];
}
