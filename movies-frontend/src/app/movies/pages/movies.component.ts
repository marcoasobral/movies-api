import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error = '';
  favIds = new Set<number>();  // ← guarda os IDs favoritados

  constructor(
    private moviesService: MoviesService,
    private favSvc: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // buscar filmes
    this.moviesService.getMovies().subscribe({
      next: data => this.movies = data,
      error: () => this.error = 'Erro ao carregar filmes.',
      complete: () => this.loading = false
    });

    // ficar de olho na lista de favoritos
    this.favSvc.getFavorites().subscribe(list => {
      this.favIds = new Set(list.map(m => m.id));
    });
  }

  favorite(movie: Movie): void {
    this.favSvc.addFavorite(movie);
    // opcional: aqui você já atualiza favIds, mas o subscribe acima faz isso
  }
}
