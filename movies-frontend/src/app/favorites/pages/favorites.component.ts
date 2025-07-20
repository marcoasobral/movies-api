import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';
import { Movie } from '../../movies/models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];

  constructor(private favSvc: FavoritesService) {}

  ngOnInit(): void {
    this.favSvc.getFavorites().subscribe(list => {
      console.log('[FavoritesComponent] lista atualizada:', list);
      this.favorites = list;
    });
  }

  remove(movie: Movie): void {
    this.favSvc.removeFavorite(movie);
  }
}
