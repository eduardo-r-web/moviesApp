import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credits.model';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.scss']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.cast);
  }

  ngAfterViewInit(){
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

}
