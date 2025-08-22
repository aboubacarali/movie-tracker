import { Routes } from '@angular/router';
import {MovieListComponent} from './components/movie-list-component/movie-list-component';
import {MovieDetailComponent} from './components/movie-detail-component/movie-detail-component';

export const routes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/:id', component: MovieDetailComponent},
];
