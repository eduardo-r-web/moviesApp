import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits.model';
import { MovieDetail } from 'src/app/interfaces/movie-detail.model';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: MovieDetail;
  public cast: Cast[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // Aplicando la desestructuracion se podria obtener varios valores de los parametros. ejemplo { id, text}
    const { id } = this.activatedRoute.snapshot.params;

    /* el combineLatest recibe una cantidad cualquiera de observables y regresa
    un arreglo de objetos con todas las respuestas de los observables cuando han emitido
    por lo menos un valor todos */
    combineLatest([
      this.moviesService.getMovieDetail( id ),
      this.moviesService.getCast( id )
    ]).subscribe( ([movie, cast]) => { // Desestructuracion del arreglo. en vez de poner (resp)
      if ( movie ) {
        this.movie = movie;
      }else{
        this.router.navigateByUrl('/home');
      }
      this.cast = cast.filter( actor => actor.profile_path !== null);
    });
  }

  back(): void{
    this.location.back();
  }

}
