import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Concert } from '../models/concert';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {

  baseUrl = 'http://localhost:8084/';
  url = this.baseUrl + 'api/concerts';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting Todo list');
      })
    );
  }
}
