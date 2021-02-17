import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { MoviesPosterGridComponent } from './movies-poster-grid/movies-poster-grid.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from './../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { CastSlideShowComponent } from './cast-slide-show/cast-slide-show.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    MoviesPosterGridComponent,
    CastSlideShowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    MoviesPosterGridComponent,
    CastSlideShowComponent
  ]
})
export class ComponentsModule { }
