import { Injectable } from '@angular/core';
import { Utenti } from '../model/utenti.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtentiComponent } from '../components/utenti/utenti.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    baseUrl = environment.baseURL;
    users: UtentiComponent[] = [];

  constructor(private http:HttpClient ) { }

  getUsers(){
    return this.http.get<Utenti[]>(`${this.baseUrl}users`);
  }
}
