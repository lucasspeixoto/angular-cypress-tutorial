import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, withViewTransitions } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
      providers: [provideRouter(routes, withViewTransitions())],
    }).compileComponents();
  });
});
