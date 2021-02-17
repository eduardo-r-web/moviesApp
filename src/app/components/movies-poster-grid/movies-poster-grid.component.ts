import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movies.model';

@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.scss']
})
export class MoviesPosterGridComponent implements OnInit {

  // https://image.tmdb.org/t/p/w500{{movie.poster_path}}

  @Input() movies: Movie[];

  constructor( private router: Router ) { }

  ngOnInit(): void {}

  movieDetail( movie: Movie ){
    console.log(movie);
    this.router.navigate([ '/movie', movie.id ]);
  }

}
