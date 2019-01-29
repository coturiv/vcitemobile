import { Injectable } from '@angular/core';
import { ApiService, HttpOptions } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) { }
  
  set loginInfo(credential: AuthCredential) {
    localStorage.setItem('loginInfo', JSON.stringify(credential));
  }

  get loginInfo(): AuthCredential {
    return JSON.parse(localStorage.getItem('loginInfo'));
  }
  
  signInWithCredential(credential: AuthCredential) {
    return this.apiService.post('http://216.83.136.35/Velosum/LoginService/LoginService.aspx', {}, new HttpOptions(new HttpHeaders(), credential));
  }

}

export interface AuthCredential {
  userName?: string;
  passWord?: string;
  custKey ?: string;
}
