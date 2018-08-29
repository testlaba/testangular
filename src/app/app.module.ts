import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JsonFilmsDbService} from './services/json-films-db.service';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FilmSearchComponent } from './components/film-search/film-search.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FilmDetailsDialogComponent } from './components/film-details-dialog/film-details-dialog.component';
import {StorageServiceModule} from 'angular-webstorage-service';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'filmsearch', component: FilmSearchComponent },
  { path: 'filmlist', component: FilmsListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FilmSearchComponent,
    FilmsListComponent,
    AppNavComponent,
    HomePageComponent,
    FilmDetailsDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule
  ],
  entryComponents: [FilmDetailsDialogComponent],
  providers: [JsonFilmsDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
