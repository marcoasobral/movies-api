import { AuthInterceptor } from './auth.interceptor';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  // stub mínimo para satisfazer o construtor
  const fakeAuth = { getToken: () => 'dummy-token' } as AuthService;

  beforeEach(() => {
    interceptor = new AuthInterceptor(fakeAuth);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header with Bearer token', () => {
    const req = new HttpRequest('GET', '/test');
    const handler: HttpHandler = {
      handle: (r) => {
        expect(r.headers.get('Authorization')).toBe('Bearer dummy-token');
        return {} as any;
      }
    };
    interceptor.intercept(req, handler);
  });
});
