import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MovieService} from '../../shared/services/movie/movie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-movie-component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-movie-component.html',
  styleUrl: './create-movie-component.css'
})
export class CreateMovieComponent implements OnInit {

  createMovieForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private router: Router) {
  }

  ngOnInit() {
    this.createMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', Validators.required],
      poster: ['', Validators.required],
      synopsis: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.createMovieForm.valid) {
      const newMovie = this.createMovieForm.value;

      this.movieService.createMovie(newMovie).subscribe({
        next: (createdMovie) => {
          console.log('Film créé avec succès:', createdMovie);
          this.router.navigate(['/movies']); // ou toute autre route de retour
        },
        error: (err) => {
          console.error('Erreur lors de la création du film :', err);
        }
      });
    } else {
      this.createMovieForm.markAllAsTouched();
    }


  }

}
