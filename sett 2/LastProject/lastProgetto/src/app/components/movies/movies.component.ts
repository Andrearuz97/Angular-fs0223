import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/model/movies.interface';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

    movies: Movies[] | undefined;

  constructor(private movieSrv: MoviesService ) { }

  ngOnInit(): void {
    setTimeout(() => {
    this.movieSrv.getMovies().subscribe((films: Movies[]) => {
        this.movies = films;
    });
},1000)
}}
