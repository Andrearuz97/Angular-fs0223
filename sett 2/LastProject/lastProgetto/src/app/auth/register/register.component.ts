import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nome!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm) {
   console.log(form.value);
    try{
        this.authService.register(form.value).subscribe();
        this.router.navigate(['/login'])
    } catch(error:any){
        console.error(error);
        if(error.status==400){
            alert('Questa e-mail risulta già utilizzata');
            this.router.navigate(['/register']);

}
}
}}



