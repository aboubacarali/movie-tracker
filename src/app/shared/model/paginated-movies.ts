import {Movie} from './movie';

export interface PaginatedMoviesResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Movie[];
}
