import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Favourite } from 'src/app/model/favourite.interface';
import { Movies } from 'src/app/model/movies.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies!: Movies[];
  imageURL = environment.imageUrl;
  utente: Auth | null = null;
  favoriti: Favourite[] = [];
  favoritiSet = new Set<number>();
  userId!: number;

  constructor(private movieSrv: MoviesService, private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.movieSrv.getMovies().subscribe((films: Movies[]) => {
        this.movies = films;
      });
    }, 1000);

    this.authService.user$.subscribe((utente) => {
      this.utente = utente;
      if (utente) {
        this.userId = utente.user.id;
        this.recuperaFavoriti(this.userId);
      }
    });
  }

  recuperaFavoriti(userId: number): void {
    this.movieSrv.recuperaFavoriti(userId).subscribe((likes: Favourite[]) => {
      this.favoriti = likes;
      this.favoritiSet = new Set(likes.map((f) => f.movieId));
    });
  }

  aggiungiFavorito(idFilm: number): void {
    const favorito: Favourite = {
      userId: this.utente!.user.id,
      movieId: idFilm,
    };

    this.movieSrv.aggiungiFavorito(favorito).subscribe((response: any) => {
        this.favoritiSet.add(idFilm);
        this.favoriti.push(response as Favourite);
      });

  }

  eliminaFavorito(filmId: number): void {
    const idFav = this.getIdFavorito(filmId);
    if (idFav) {
      const index = this.favoriti.findIndex((f) => f.id === idFav);
      if (index !== -1) {
        this.favoriti.splice(index, 1);
      }
      this.movieSrv.rimuoviFavorito(idFav).subscribe(() => {
        this.favoritiSet.delete(filmId);
      });
    }
  }

  isFavorito(filmId: number): boolean {
    return this.favoritiSet.has(filmId);
  }

  getIdFavorito(filmId: number): number | undefined {
    const favorito = this.favoriti.find((f) => f.movieId === filmId);
    return favorito?.id;
  }
}
