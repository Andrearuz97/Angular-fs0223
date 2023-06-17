import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Movies } from 'src/app/model/movies.interface';
import { MoviesService } from 'src/app/service/movies.service';
import { environment } from 'src/environments/environment';
import { Favourite } from 'src/app/model/favourite.interface';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
    movies: Movies[] = [];
    imageURL = environment.imageUrl;
    utente!: Auth | null;
    favoriti: Favourite[] = [];
    userId!: number;

    constructor(private authSrv: AuthService, private movieSrv: MoviesService) {
        this.authSrv.user$.subscribe((_utente) => {
            this.utente = _utente;
        });
        this.userId = this.utente!.user.id;
    }

    ngOnInit(): void {
        this.movieSrv
            .recuperaFavoriti(this.userId).subscribe((likes: Favourite[]) => {
                this.favoriti = likes;
            });
        setTimeout(() => {
            this.stampaFavoriti();
        }, 500);
    }

    stampaFavoriti() {
        this.favoriti.forEach((film) => {
            if (film.movieId) {
                this.movieSrv.movieDetails(film.movieId).subscribe((dettaglio) => {
                        this.movies.push(dettaglio);
                    });
            }
        });
    }
}
