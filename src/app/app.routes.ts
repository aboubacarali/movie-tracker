import { Routes } from '@angular/router';
import {MovieListComponent} from './components/movie-list-component/movie-list-component';

export const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MovieListComponent}
];
