import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    movies: Movies[] = [];
  constructor(private http: HttpClient) { }
  getMovies(){
    return this.http.get<Movies[]>('http://localhost:4300/api/movie/popular');
  }

}
