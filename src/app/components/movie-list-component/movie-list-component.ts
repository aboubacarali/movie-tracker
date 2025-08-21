import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/services/movie/movie-service';
import {Observable} from 'rxjs';
import {Movie} from '../../shared/model/movie';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {PaginatedMoviesResponse} from '../../shared/model/paginated-movies';
import {environment} from '../../../environment/environment';


@Component({
  selector: 'app-movie-list-component',
  imports: [
    JsonPipe, MatListModule, MatDividerModule, CommonModule, AsyncPipe],
  templateUrl: './movie-list-component.html',
  styleUrl: './movie-list-component.css'
})
export class MovieListComponent implements OnInit {

  public asyncMovieList!: Observable<PaginatedMoviesResponse>;
  response!: PaginatedMoviesResponse;
  isLoading = true;
  public movieList: Movie[] = []

  constructor(private movieService: MovieService)
  { }

  async ngOnInit() {
    this.movieService.getMovies(1,environment.moviesPerPageLimit).subscribe((res:any) => {
      this.movieList = res;
      console.log({'Movie list':this});
    })
  }

  loadData(response: PaginatedMoviesResponse)  {
    this.response = response;
    this.movieList = response.data as Movie[];

    this.isLoading = false;

  }

  onDataError (error: any) {
    console.log({'An error occured: ': error});
    this.isLoading = false;
  }



  async loadMovies(page: number = 1) {
    this.movieService.getMovies(page, environment.moviesPerPageLimit)
      .subscribe(
        this.loadData
        /*
        {
          next: this.loadData,

          error: this.onDataError
        }

         */
        );

  }


}
