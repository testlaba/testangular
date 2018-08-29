import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JsonFilmsDbService} from '../../services/json-films-db.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilmDetailsDialogComponent} from '../film-details-dialog/film-details-dialog.component';
import {Observable, pipe} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {StorageServiceService} from '../../services/storage-service.service';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {

  private favoriteFilmsStorage: WebStorageService;

  searchForm: FormGroup;
  title = new FormControl();
  films: any;
  autocomplFilteredFilms: Observable<any>;

  constructor(private fb: FormBuilder,
              private apiFilmDbService: JsonFilmsDbService,
              private dialog: MatDialog,
              private storageService: StorageServiceService) {
    this.searchForm = fb.group({
      title: ''
    });
    this.favoriteFilmsStorage = storageService.storage;
  }

  ngOnInit() {
    this.autocomplFilteredFilms = this.searchForm.get('title').valueChanges
      .pipe(
        debounceTime(400),  // angular - RXJS 5.5+
        startWith(''),
        switchMap(value => {
          const filterValue = value.toLowerCase();
          if (filterValue) {
            return this.apiFilmDbService.searchFilmsByTitle(filterValue).pipe(
              map(response => {
                return response;
              })
            );
          } else {
            return [];
          }
        })
      );
  }

  search() {
    const titleStr = this.searchForm.value.title;
    if ( titleStr ) {
      this.apiFilmDbService.searchFilmsByTitle(titleStr).subscribe((films) => {
        if (films != null) {
          const storage = this.favoriteFilmsStorage;
          films.forEach(function (film) {
            if ( storage.get(film.id) ) {
              film.isFavorite = true;
            }
          });
          this.films = films;
          // console.log(films);
        }
      });
    }
  }


  details(film: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      film: film,
      favoriteFilmsStorage: this.favoriteFilmsStorage
    };

    const dialogRef = this.dialog.open(FilmDetailsDialogComponent, dialogConfig);

  }

}
