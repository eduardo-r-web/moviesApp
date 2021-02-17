import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { nowPlaying } from 'src/app/interfaces/now-playing.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie } from 'src/app/interfaces/movies.model';
import { MovieDetail } from 'src/app/interfaces/movie-detail.model';
import { Cast, CreditResponse } from 'src/app/interfaces/credits.model';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private page = 1;
  public loading = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: environment.api_key,
      language: 'es-ES',
      page: this.page.toString()
    };
  }

  resetNowPlaying(){
    this.page = 1;
  }

  getMoviesNowPlaying(): Observable<Movie[]> {
    // tslint:disable-next-line: max-line-length
    // para no usar todo en la url: `${ environment.api_url }/3/movie/now_playing?api_key=${ environment.api_key }&language=es-ES&page=1` mejor se usa asi: `${environment.api_url}/3/movie/now_playing`, { params: this.params }
    if ( this.loading ){
      return of([]);  // of es una funcion para crear observables y dentro de los parentesis se pone lo que uno quiere que emita el observable. En este caso devuelve un arreglo vacio
    }

    this.loading = true;
    return this.http.get<nowPlaying>(`${environment.api_url}/3/movie/now_playing`, {
      params: this.params
    }).pipe(
      map(resp => resp.results),
      tap(() => {   /* tap se encarga de disparar un objeto secundario, emite ese codigo cada vez que el observable emite un valor. El tap no modifica ni altera nada */
        this.page += 1;
        this.loading = false;
      })
    );
  }

  searchMovie( search: string): Observable<Movie[]>{
    // /3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
    const params = {  ...this.params, page: '1', query: search };

    return this.http.get<nowPlaying>(`${ environment.api_url }/3/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );
  }

  getMovieDetail( id: string ){
    return this.http.get<MovieDetail>(`${ environment.api_url }/3/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCast( id: string): Observable<Cast[]>{
    //https://api.themoviedb.org/3/movie/kj/credits?api_key=<<api_key>>&language=es-ES
    return this.http.get<CreditResponse>(`${ environment.api_url }/3/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( credit => credit.cast ),
      catchError( err => of([]))
    );
  }
}
