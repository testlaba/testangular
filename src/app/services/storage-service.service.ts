import {Inject, Injectable} from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor(@Inject(SESSION_STORAGE) private favoriteFilmsStorage: WebStorageService) {
    const idx: number[] = [];
    this.favoriteFilmsStorage.set('idx', idx);
  }

  get storage() {
    return this.favoriteFilmsStorage;
  }
}
