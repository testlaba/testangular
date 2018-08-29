import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JsonFilmsDbService} from '../../services/json-films-db.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilmDetailsDialogComponent} from '../film-details-dialog/film-details-dialog.component';
import {Observable, pipe} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {

  searchForm: FormGroup;
  title = new FormControl();
  films: any;
  autocomplFilteredFilms: Observable<any>;

  constructor(private fb: FormBuilder,
              private apiFilmDbService: JsonFilmsDbService,
              private dialog: MatDialog) {
    this.searchForm = fb.group({
      title: ''
    });
  }

  ngOnInit() {
    this.autocomplFilteredFilms = this.searchForm.get('title').valueChanges // this.title.valueChanges
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
    this.apiFilmDbService.searchFilmsByTitle(titleStr).subscribe((films) => {
      if ( films != null) {
        this.films = films;
        // console.log(films);
      }
    });
  }


  details(film: any) {
    const zzz = film;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    // dialogConfig.height = '600px';
    dialogConfig.data = {
      film: film
    };

    const dialogRef = this.dialog.open(FilmDetailsDialogComponent, dialogConfig);

  }

}
