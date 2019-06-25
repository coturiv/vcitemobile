import { Injectable } from '@angular/core';
import { ApiService, HttpOptions } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { StorageKeys } from '../utility/constant';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  set currentUser(user: any) {
    localStorage.setItem(StorageKeys.CURRENT_USER, JSON.stringify(user));
  }

  get currentUser(): any {
    return JSON.parse(localStorage.getItem(StorageKeys.CURRENT_USER));
  }

  signInWithCredential(UserID: string, Password: string) {
    // return this.apiService.post('User/Login', {UserID, Password});
    return of({
      data: {
        username: 'lynntest'
      },
      status: {
        success: true
      }
    });
  }

}
