import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  public setItem(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  public getItem(key: string): Promise<any> {
    return this.storage.get(key);
  }

  public removeItem(key: string): Promise<any> {
    return this.storage.remove(key);
  }

  public clearAll(): Promise<void> {
    return this.storage.clear();
  }
}
