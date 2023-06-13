import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/movies.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    baseUrl = environment.baseURL;
    movies: Movies[] = [];
  constructor(private http: HttpClient) { }
  getMovies(){
    return this.http.get<Movies[]>(`${this.baseUrl}api/movie/popular`);
  }

}
