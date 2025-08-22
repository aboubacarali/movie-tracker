import {Component, OnInit} from '@angular/core';
import {Movie} from '../../shared/model/movie';
import {MovieService} from '../../shared/services/movie/movie-service';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-movie-detail-component',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.css'
})
export class MovieDetailComponent implements OnInit {
  isLoading = true;
  movie!: Movie;

  constructor(private movieService: MovieService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.movieService.getSingleMovie(this.router.snapshot.params['id'])
      .subscribe({
        next: data => {
          this.movie = data;
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.isLoading = false;
        }
      });
  }

}
