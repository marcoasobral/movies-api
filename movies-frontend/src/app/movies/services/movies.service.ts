import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';

interface MoviesApiResponse {
  data: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalMovies: number;
    moviesPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    sortBy: string;
    order: 'asc' | 'desc';
    genero: string | null;
  };
}

@Injectable({ providedIn: 'root' })
export class MoviesService {
    private readonly apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  /** Retorna só o array de filmes */
  getMovies(): Observable<Movie[]> {
    return this.http
      .get<MoviesApiResponse>(this.apiUrl)
      .pipe(map(response => response.data));
  }
}
