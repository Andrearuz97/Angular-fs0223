import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe(
      () => {
        // Accesso riuscito, effettua la gestione della navigazione o delle azioni desiderate
      },
      (error) => {
        // Gestione dell'errore di accesso
      }
    );
  }
}
