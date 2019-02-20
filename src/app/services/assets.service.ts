import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { VehColor, VehState, VehMake, Violation, Location } from '../entities';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private apiService: ApiService) { }

  getVehColors() {
    return this.apiService.get<VehColor[]>('assets/data/vehicle_colors.json').pipe(
      map(data => data.map(c => Object.assign(new VehColor(), c)))
    ).toPromise();
  }

  getVehStates() {
    return this.apiService.get<VehState[]>('assets/data/us_states.json').pipe(
      map(data => data.map(c => Object.assign(new VehState(), c)))
    ).toPromise();
  }

  getVehMakes() {
    return this.apiService.get<VehMake[]>('assets/data/vehicle_makes.json').pipe(
      map(data => data.map(c => Object.assign(new VehMake(), c)))
    ).toPromise();
  }

  getViolations() {
    return this.apiService.get<Violation[]>('assets/data/violations.json').pipe(
      map(data => data.map(c => Object.assign(new Violation(), c)))
    ).toPromise();
  }

  getLocations() {
    return this.apiService.get<Location[]>('assets/data/locations.json').pipe(
      map(data => data.map(c => Object.assign(new Location(), c)))
    ).toPromise();
  }
}
