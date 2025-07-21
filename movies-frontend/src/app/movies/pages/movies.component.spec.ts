import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MoviesService } from '../services/movies.service';
import { environment } from '../../environments/environment';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const mockResp = {
    data: [{ id: 1, nome: 'A', anoLancamento: 2021, descricao: '', genero: '' }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch data array', (done: DoneFn) => {
    service.getMovies().subscribe((movies: any[]) => {
      expect(movies.length).toBe(1);
      expect(movies[0].nome).toBe('A');
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResp);
    httpMock.verify();
  });
});
