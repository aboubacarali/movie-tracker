import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/services/movie/movie-service';
import {Observable} from 'rxjs';
import {Movie} from '../../shared/model/movie';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {PaginatedMoviesResponse} from '../../shared/model/paginated-movies';
import {environment} from '../../../environment/environment';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-movie-list-component',
  imports: [MatListModule, MatDividerModule, CommonModule, RouterLink],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css'

})
export class MovieListComponent implements OnInit {

  public asyncMovieList!: Observable<PaginatedMoviesResponse>;
  response!: PaginatedMoviesResponse;
  isLoading = true;
  public movieList: Movie[] = []

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getMovies(1, environment.moviesPerPageLimit)
      .subscribe({
        next: (data: PaginatedMoviesResponse) => {
          this.response = data;
          this.movieList = data.data;
          this.isLoading = false;

        },
        error: err => {
          console.log(err)
          this.isLoading = false
        }
      })
  }

  handlePageChange(page: number) {
    this.movieService.getMovies(page, environment.moviesPerPageLimit)
      .subscribe({
        next: (data: PaginatedMoviesResponse) => {
          this.response = data;
          this.movieList = data.data;
          this.isLoading = false;

        },
        error: err => {
          console.log(err)
          this.isLoading = false
        }
      })
  }


}
