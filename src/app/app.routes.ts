import { RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { catchError, EMPTY, of, throwError } from 'rxjs';

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

        return httpClient.get('http://cataleya.bg/api/v1/dummy1/?delay=1').pipe(
          catchError((e) => {
            return of(new RedirectCommand(router.parseUrl('/')));
          })
        );
      },
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
