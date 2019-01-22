import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly storageKey: string = 'config';

  constructor(private storageService: StorageService) { }

  getSettings(): Promise<VSettings> {
    return this.storageService.getItem(this.storageKey);
  }

  setSettings(config: VSettings) {
    return this.storageService.setItem(this.storageKey, config);
  }

}

export interface VSettings {
  timestamp: number;
}
