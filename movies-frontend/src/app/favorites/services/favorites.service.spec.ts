import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Movie } from '../../movies/models/movie.model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const fakeMovie: Movie = {
    id: 1,
    nome: 'X',
    anoLancamento: 2020,
    descricao: '',
    genero: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FavoritesService] });
    service = TestBed.inject(FavoritesService);
    localStorage.removeItem('favorites');
  });

  it('should start empty', (done: DoneFn) => {
    service.getFavorites().subscribe(list => {
      expect(list).toEqual([]);
      done();
    });
  });

  it('should add a favorite', (done: DoneFn) => {
    service.addFavorite(fakeMovie);
    service.getFavorites().subscribe(list => {
      expect(list).toContain(fakeMovie);
      done();
    });
  });
});
