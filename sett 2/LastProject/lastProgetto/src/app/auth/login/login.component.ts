import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    login(form: NgForm) {
        try {
            this.authService.login(form.value).subscribe();
            alert('Login effettuato con successo!');
            this.router.navigate(['/']);
        } catch (error) {
            alert('Login non riuscito');
            this.router.navigate(['/login']);
        }
    }
}
