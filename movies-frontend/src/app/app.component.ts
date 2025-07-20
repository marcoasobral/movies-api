import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,               // ← torna standalone
  imports: [RouterOutlet, CommonModule],        // ← já estava importando o outlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // ← nomes no plural, array
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
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    this.idleTimer = setTimeout(() => {
      this.auth.logout();
    }, this.idleDuration);
  }
}