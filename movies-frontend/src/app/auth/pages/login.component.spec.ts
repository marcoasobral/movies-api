import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);
    TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: spy }]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should show error on failed login', () => {
    authSpy.login.and.returnValue(throwError(() => new Error('fail')));
    component.usuario = 'x';
    component.senha = 'y';
    component.onSubmit();
    expect(component.errorMsg).toBe('Usuário ou senha inválidos');
  });

  it('should call login and saveToken on success', () => {
    authSpy.login.and.returnValue(of({ token: '123' }));
    component.usuario = 'u';
    component.senha = 'p';
    component.onSubmit();
    expect(authSpy.login).toHaveBeenCalledWith({ usuario: 'u', senha: 'p' });
    expect(authSpy.saveToken).toHaveBeenCalledWith('123');
  });
});
