import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../model/movies.interface';
import { environment } from 'src/environments/environment';
import { Favourite } from '../model/favourite.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    movies: Movies[] = [];
    getMoviesDetails(movieIds: number[]) {
        throw new Error('Method not implemented.');
    }
    baseUrl = environment.baseURL;
  constructor(private http: HttpClient) { }
  getMovies(){
    return this.http.get<Movies[]>(`${this.baseUrl}api/movie/popular`);
  }

  movieDetails(id: number) {
    return this.http.get<Movies>(`${this.baseUrl}api/movie/popular/${id}`);
}
 recuperaFavoriti(userId: number) {
        return this.http.get<Favourite[]>(`${this.baseUrl}favorites?userId=${userId}`);
    }

    aggiungiFavorito(favorito: Favourite) {
        return this.http.post(`${this.baseUrl}favorites`, favorito);
    }


    rimuoviFavorito(favoritoId: number) {
        return this.http.delete(`${this.baseUrl}favorites/${favoritoId}`);
    }
}
