import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,             
  imports: [RouterOutlet, CommonModule],        
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  private idleTimer?: ReturnType<typeof setTimeout>;
  private readonly idleDuration = 60_000; // 1 minuto

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.startInactivityWatch();
  }

  private startInactivityWatch(): void {
    // Dispara logout após idleDuration sem reset
    this.resetTimer();
    // Ouve eventos que indicam atividade do usuário
    ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll']
      .forEach(evt =>
        document.addEventListener(evt, () => this.resetTimer())
      );
  }

  private resetTimer(): void {
    // 1) Limpa qualquer timer anterior
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  
    // 2) Agenda o logout
    this.idleTimer = setTimeout(() => {
      // Só chama logout(expired) se o usuário ainda estiver autenticado
      if (this.auth.isAuthenticated()) {
        this.auth.logout(true);
      }
      // 3) Limpa de novo para não disparar duas vezes
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
      }
    }, this.idleDuration);
  }
}  