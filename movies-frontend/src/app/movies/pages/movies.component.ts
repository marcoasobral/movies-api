import { FavoritesService } from '../../favorites/services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];      // lista de filmes
  loading = false;           // indicador de carregamento
  error = '';                // mensagem de erro

  constructor(
    private moviesService: MoviesService,
    private favSvc: FavoritesService,
    ) {}

  ngOnInit(): void {
    this.loading = true;
    this.moviesService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: () => this.error = 'Erro ao carregar filmes.',
      complete: () => this.loading = false
    });
  }

  favorite(movie: Movie): void {
    console.log('[MoviesComponent] favorite() chamado para:', movie);
    this.favSvc.addFavorite(movie);
  }
}
