import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JsonFilmsDbService {

  constructor(private http: HttpClient) { }

  public searchFilmsByTitle(titleStr: string): Observable<any> {
    return this.http
      .get(API_URL + '/films?Title_like=' + titleStr)
      .pipe(
        map(response => {
            const films = response;
            return films;
        }),
        catchError( this.handleError )
      );
  }

  /**
   * REST Api Error handling
   * @param error
   */
  private handleError (error: HttpResponse<Object> | any ) {
    console.error('ApiCityService::handleError: HttpResponse', error);
    return throwError(error);
  }

}
