import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Movie } from 'src/app/interfaces/movies.model';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: string;
  movies: Movie[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params: Params) =>{
      this.search = params.text;
      this.moviesService.searchMovie( this.search )
        .subscribe( movies => {
          this.movies = movies;
        });
    });
  }

}
