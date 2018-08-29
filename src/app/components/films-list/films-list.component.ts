import { Component, OnInit } from '@angular/core';
import {StorageServiceService} from '../../services/storage-service.service';
import {WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  private favoriteFilmsStorage: WebStorageService;
  films: any[] = [];

  constructor(private storageService: StorageServiceService) {
    this.favoriteFilmsStorage = storageService.storage;
    const idx = this.favoriteFilmsStorage.get('idx');
    const films = this.films;
    idx.forEach(function (id) {
      const xxx = id;
      films.push(storageService.storage.get(id));
    });
    const zzz = 1;
  }

  ngOnInit() {
  }

}
