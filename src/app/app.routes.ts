import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { catchError, delay, EMPTY } from 'rxjs';

export const routes: Routes = [
  { path: 'home', title: 'Начало', component: HomeComponent },
  {
    path: 'resolver',
    loadComponent: () =>
      import('./resolver/resolver.component').then((c) => c.ResolverComponent),
    resolve: {
      meta: () => {
        const httpClient = inject(HttpClient);
        const router = inject(Router);

        console.log('RESOLVER FUNCTION EXECUTED');

        return httpClient.get('https://httpbin.org/delay/1').pipe(
          delay(1000), // it seems that this delay causes the described issue
          catchError(() => {
            router.navigate(['']);
            return EMPTY;
          })
        );
      },
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
