import { TestBed, inject } from '@angular/core/testing';

import { JsonFilmsDbService } from './json-films-db.service';

import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';

describe('JsonFilmsDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        JsonFilmsDbService
      ]
    });
  });

  it('should be created', inject([JsonFilmsDbService], (service: JsonFilmsDbService) => {
    expect(service).toBeTruthy();
  }));

  /** test on base of json-server */
  it('searchFilmsByTitle(titleStr)', inject([JsonFilmsDbService], (service: JsonFilmsDbService) => {
    const titleStr = 'Tri';
    service.searchFilmsByTitle(titleStr).subscribe((films) => {
        if ( films != null) {
          const film = films[0];
          console.log(film);
          expect(films[0].Title.toEqual('Blade: Trinity'));
        }
      });

  }));

});
