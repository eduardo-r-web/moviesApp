import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  searchMovie( txtSearch: string ){
    txtSearch = txtSearch.trim();

    if ( txtSearch.length !== 0 ) {
      this.router.navigate(['/search', txtSearch]);
    }
    console.log( txtSearch );
  }
}
