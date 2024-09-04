// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './service/data.service';
import { Observable } from 'rxjs';
import { Courses } from './interfaces/courses';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RxJS-Error-Handling-and-Debugging';

  courses$: Courses[] = [];
  error: string | null = null;
  loading: boolean = false;

  constructor(public dataService: DataService) {}

  fetchData() {
    this.loading = true;
    this.courses$ = [];
    this.error = null;

    this.dataService.simulateHttpRequest('assets/data.json').subscribe({
      next: (data) => {
        this.courses$ = data as Courses[];
        this.loading = false;
        console.log('Data fetched:', this.courses$);
      },
      error: (err) => {
        console.log('An error occured', this.error);
        this.error = 'Failed to fetch courses: ' + err.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
