import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../../services/user.service';

@Component({
  selector: 'app-nav_bar',
  imports: [],
  templateUrl: './nav_bar.component.html',
  styleUrl: './nav_bar.component.css',
})
export class Nav_BarComponent {

  constructor(private router: Router, private userService : UserServices) {};

  navigateToEntry(){
    this.router.navigate(['/view1'])
  }

  navigateToSignIn(){

    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/report'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

}