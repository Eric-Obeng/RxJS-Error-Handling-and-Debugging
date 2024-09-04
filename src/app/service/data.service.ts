import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  from,
  map,
  of,
  retry,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { Courses } from '../interfaces/courses';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // simulating Http request
  simulateHttpRequest(url: string) {
    const fetchSuccess = Math.random() < 0.5;

    return timer(1000).pipe(
      delay(1000),
      tap(() => console.log('Loading data...')),
      switchMap(() => {
        if (fetchSuccess) {
          return from(
            fetch(url).then((res) => {
              return res.json();
            })
          );
        } else {
          return throwError(() => new Error('Failed to fetch data'));
        }
      }),
      retry(3),
      tap({
        error: (err) => {
          console.error('Failed after retry', err);
        },
        complete: () => console.log('Request completed'),
      }),
      catchError((error) => {
        console.error('An error occurred while fetching data:', error);
        return throwError('Fallback: An error occured', error);
      }),
      tap({
        next: (data) => console.log('Data received ', data),
        error: (err) => console.error('Failed to retrieve data', err),
        complete: () => console.log('Request completed'),
      })
    );
  }
}
