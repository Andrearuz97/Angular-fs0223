import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Movies } from 'src/app/model/movies.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
 id!: number;
 movies!: Movies;

  constructor(private MovieServ: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  this.route.params.subscribe(parametro => {
    console.log(parametro);
    this.id = +parametro['id'];
    console.log(this.id);
    this.loadsDetails();
});

}
loadsDetails() {
    setTimeout(() => {
      this.MovieServ.movieDetails(this.id).subscribe(dettaglio => {
        this.movies = dettaglio;
      });
    }, 1000);

}}
