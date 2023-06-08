import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, of, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<any>('./assets/fake-api/data.json', { responseType: 'json' }).pipe(
      delay(1000),
      timeout(16000),
      catchError(() => of({
        data: {
          list0: [],
          list1: [],
        }
      }))
    );
  }

}
