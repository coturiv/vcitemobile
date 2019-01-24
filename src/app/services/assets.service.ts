import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { VehColor, VehState, VehMake } from '../entity';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private apiService: ApiService) { }

  getVehColors() {
    return this.apiService.get<VehColor[]>('assets/data/vehicle_colors.json').pipe(
      map(colors => colors.map(c => Object.assign(new VehColor(), c)))
    ).toPromise();
  }

  getVehStates() {
    return this.apiService.get<VehState[]>('assets/data/us_states.json').pipe(
      map(colors => colors.map(c => Object.assign(new VehState(), c)))
    ).toPromise();
  }

  getVehMakes() {
    return this.apiService.get<VehMake[]>('assets/data/vehicle_makes.json').pipe(
      map(colors => colors.map(c => Object.assign(new VehMake(), c)))
    ).toPromise();
  }
}
