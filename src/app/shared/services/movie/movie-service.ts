import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Movie} from '../../model/movie';
import {environment} from '../../../../environment/environment';
import {PaginatedMoviesResponse} from '../../model/paginated-movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  public getMovies(page: number, limit: number): Observable<PaginatedMoviesResponse> {
    return this.http.get<PaginatedMoviesResponse>(environment.apiUrl + `movies?_page=${page}&_per_page=${limit}`)
      /*.pipe(map((res:any) => {
        return res.body.data.map((movie:any) => {
          let m:Movie = movie as Movie;
          return m;
        })
      }))*/
  }

  public getSingleMovie (id:number): Observable<Movie> {
    return this.http.get<Movie>(environment.apiUrl + `movies/${id}`)
  }

  public createMovie (movie: Omit<Movie, 'id'>): Observable<Movie> {
    return this.http.post<Movie>(environment.apiUrl + `movies`, movie)
  }

}
