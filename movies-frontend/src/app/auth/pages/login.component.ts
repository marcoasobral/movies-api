import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginPayload, LoginResponse } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = '';
  senha = '';
  loading = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // se vier ?sessionExpired=true, mostra a mensagem
    if (this.route.snapshot.queryParams['sessionExpired'] === 'true') {
      this.errorMsg = 'Sua sessão expirou, logue novamente para acessar o catálogo de filmes';
    }
  }



  onSubmit(): void {
    if (!this.usuario || !this.senha) {
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    const payload: LoginPayload = { usuario: this.usuario, senha: this.senha };

    this.authService.login(payload).subscribe({
      next: (resp: LoginResponse) => {
        this.authService.saveToken(resp.token);
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.errorMsg = 'Usuário ou senha inválidos';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
