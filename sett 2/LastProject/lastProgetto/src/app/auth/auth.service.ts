import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    baseURL = environment.baseURL;
    utente!: Auth;
    jwtHelper = new JwtHelperService();
    private authSubj = new BehaviorSubject<null | Auth>(null);
    user$ = this.authSubj.asObservable();
    timeOut: any;
    currentUser: Auth | null = null;


    constructor(private http: HttpClient, private router: Router) {}

    login(data: {email: string, password: string}) {
        return this.http.post<Auth>(`${this.baseURL}login`, data).pipe(
            tap((data) => {
                console.log(data);
                this.authSubj.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data);
            })
        )
    }

    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    autoLogout(data: Auth) {
        const scadenza = this.jwtHelper.getTokenExpirationDate(
            data.accessToken
        ) as Date;

        const tempoScadenza = scadenza.getTime() - new Date().getTime();
        this.timeOut = setTimeout(() => {
            this.logout()
        }, tempoScadenza);
    }

    restore() {
        const utenteLoggato = localStorage.getItem('user');
        if (!utenteLoggato) {
            return;
        }

        const datiUtente: Auth = JSON.parse(utenteLoggato);
        if (this.jwtHelper.isTokenExpired(datiUtente.accessToken)) {
            return;
        }
        this.authSubj.next(datiUtente);
        this.autoLogout(datiUtente);
    }

    register(data: {
        nome: string,
        cognome: string,
        email: string,
        password: string,
        corsi: number
      }) {
        return this.http.post(`${this.baseURL}register`, data )

        };

        getUserDetails(): Auth | null {
            return this.authSubj.getValue();
          }


      }


