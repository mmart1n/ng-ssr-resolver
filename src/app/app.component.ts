import { AsyncPipe } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { ResolveEnd, ResolveStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-ssr-resolver';
  #router = inject(Router);
  isLoading$: Observable<boolean> = of(false);

  constructor() {
    afterNextRender(() => {
      this.isLoading$ = this.#router.events.pipe(
        filter((e) => e instanceof ResolveStart || e instanceof ResolveEnd),
        tap((e) => {
          console.log(`Resolver Event: ${e instanceof ResolveStart ? 'start' : 'end'}`)
        }),
        map((e) => e instanceof ResolveStart)
      );
    });
  }
}
