import { Component, HostListener, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { Movie } from 'src/app/interfaces/movies.model';
import { MoviesService } from './../../services/movies/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
// tslint:disable
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() { // the method is created by myself
    const position = (document.documentElement.scrollTop || document.body.scrollTop) + 1300; // in some browsers the first method does not work so the second is used
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (position > max) {
      if (!this.moviesService.loading) {
        this.moviesService.getMoviesNowPlaying()
          .subscribe(movies => {
            this.movies.push(...movies);  
          });
      }
    }
  }

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMoviesNowPlaying()
      .subscribe(movies => {
        this.movies = movies;
        this.moviesSlideShow = movies;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.moviesService.resetNowPlaying();
  }

}
