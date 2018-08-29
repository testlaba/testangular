import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-film-details-dialog',
  templateUrl: './film-details-dialog.component.html',
  styleUrls: ['./film-details-dialog.component.css']
})
export class FilmDetailsDialogComponent implements OnInit {

  film: any;
  favoriteFilmsStorage: WebStorageService;
  // data: any = [];

  constructor(private dialogRef: MatDialogRef<FilmDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.film = data.film;
    this.favoriteFilmsStorage = data.favoriteFilmsStorage;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onFavorite(ev) {
    if (!this.film.isFavorite) {
      this.favoriteFilmsStorage.set(this.film.id, this.film);

      const idx = this.favoriteFilmsStorage.get('idx');
      idx.push(this.film.id);
      this.favoriteFilmsStorage.set('idx', idx);

    } else {
      this.favoriteFilmsStorage.remove(this.film.id);

      const idx = this.favoriteFilmsStorage.get('idx');
      const index = idx.findIndex(elem => elem === this.film.id);
      idx.splice(index, 1);
      this.favoriteFilmsStorage.set('idx', idx);
    }
  }

}
