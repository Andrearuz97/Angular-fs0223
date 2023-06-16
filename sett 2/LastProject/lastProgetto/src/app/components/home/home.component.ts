import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Auth } from 'src/app/auth/auth.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent implements OnInit {

    utente: Auth | null = null;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.user$.subscribe((_utente) => {
        this.utente = _utente;
      });
    }

  }
