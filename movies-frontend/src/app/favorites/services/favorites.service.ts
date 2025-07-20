import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../../movies/models/movie.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storageKey = 'favorites';
  private favoritesSubject: BehaviorSubject<Movie[]>;

  constructor() {
    // Carrega do localStorage ou inicia lista vazia
    const saved = localStorage.getItem(this.storageKey);
    const initial: Movie[] = saved ? JSON.parse(saved) : [];
    this.favoritesSubject = new BehaviorSubject<Movie[]>(initial);
  }

  /** Observable que emite a lista de favoritos */
  getFavorites(): Observable<Movie[]> {
    return this.favoritesSubject.asObservable();
  }

  /** Adiciona e persiste a lista */
  addFavorite(movie: Movie): void {
    const current = this.favoritesSubject.value;
    if (!current.find(m => m.id === movie.id)) {
      const next = [...current, movie];
      this.favoritesSubject.next(next);
      localStorage.setItem(this.storageKey, JSON.stringify(next));
    }
  }

  /** Remove e persiste a lista */
  removeFavorite(movie: Movie): void {
    const next = this.favoritesSubject.value.filter(m => m.id !== movie.id);
    this.favoritesSubject.next(next);
    localStorage.setItem(this.storageKey, JSON.stringify(next));
  }
}
