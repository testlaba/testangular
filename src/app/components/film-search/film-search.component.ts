import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JsonFilmsDbService} from '../../services/json-films-db.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilmDetailsDialogComponent} from '../film-details-dialog/film-details-dialog.component';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.css']
})
export class FilmSearchComponent implements OnInit {

  searchForm: FormGroup;
  films;

  constructor(private fb: FormBuilder,
              private apiFilmDbService: JsonFilmsDbService,
              private dialog: MatDialog) {
    this.searchForm = fb.group({
      title: ''
    });
  }

  ngOnInit() {
  }

  search() {
    const titleStr = this.searchForm.value.title;
    this.apiFilmDbService.searchFilmsByTitle(titleStr).subscribe((films) => {
      if ( films != null) {
        this.films = films;
        console.log(films);
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
