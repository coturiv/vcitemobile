import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  getCitations(){
    return this.http.get('assets/data/citations.json')
      .map((response:Response)=>response.json());
  }

  getStates(){
    return this.http.get('assets/data/us_states.json')
      .map((response:Response)=>response.json());
  }

  getVehicleColors(){
    return this.http.get('assets/data/vehicle_colors.json')
      .map((response:Response)=>response.json());
  }

  getVehicleMakes(){
    return this.http.get('assets/data/vehicle_makes.json')
      .map((response:Response)=>response.json());
  }

}