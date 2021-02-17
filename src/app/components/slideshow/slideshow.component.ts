import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies.model';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  ngOnInit(): void {}

  onSlideNext(){
    this.mySwiper.slideNext();
  }
  onSlidePrev(){
    this.mySwiper.slidePrev();
  }
}
