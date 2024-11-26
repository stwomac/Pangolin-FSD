import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav_bar',
  imports: [],
  templateUrl: './nav_bar.component.html',
  styleUrl: './nav_bar.component.css',
})
export class Nav_BarComponent {

  constructor(private router: Router) {};

  navigateToEntry(){
    this.router.navigate(['/view1'])
  }

  navigateToSignIn(){
    let isAuth= true;
    if(isAuth)
      this.router.navigate(['/report'])
    else
      this.router.navigate(['/view1'])
  }

}