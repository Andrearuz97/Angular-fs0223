import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Movies } from 'src/app/model/movies.interface';
import { MoviesService } from 'src/app/service/movies.service';
import { environment } from 'src/environments/environment';
import { Favourite } from 'src/app/model/favourite.interface';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
    movies: Movies[] = [];
    imageURL = environment.imageUrl;
    utente!: Auth | null;
    favoriti!: Favourite[];
    userId!: number;

    constructor(private authSrv: AuthService, private movieSrv: MoviesService) {
        this.authSrv.user$.subscribe((_utente) => {
            this.utente = _utente;
        });
        this.userId = this.utente!.user.id;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.movieSrv.recuperaFavoriti(this.userId).subscribe((likes: Favourite[]) => {
                this.favoriti = likes;
                this.stampaFavoriti();
            });
        }, 1000);
    }

    stampaFavoriti() {
        const movieIds = this.favoriti
            .map((film) => film.movieId)
            .filter((id) => id !== undefined) as number[];

        const observables = movieIds.map((movieId) => this.movieSrv.movieDetails(movieId));

        forkJoin(observables).subscribe((dettagli: Movies[]) => {
            this.movies = dettagli;
        });
    }
}
