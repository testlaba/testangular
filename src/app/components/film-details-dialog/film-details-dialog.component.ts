import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-film-details-dialog',
  templateUrl: './film-details-dialog.component.html',
  styleUrls: ['./film-details-dialog.component.css']
})
export class FilmDetailsDialogComponent implements OnInit {

  film: any;

  constructor(private dialogRef: MatDialogRef<FilmDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.film = data.film;
  }

  ngOnInit() {
  }

}
