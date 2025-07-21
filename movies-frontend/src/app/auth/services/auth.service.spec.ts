import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    localStorage.removeItem('token');
  });

  it('deve limpar o token ao logout', () => {
    localStorage.setItem('token', 'abc');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('isAuthenticated deve refletir estado do token', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem('token', 'xyz');
    expect(service.isAuthenticated()).toBeTrue();
  });
});
