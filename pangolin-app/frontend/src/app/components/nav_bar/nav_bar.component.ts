import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserServices } from '../../services/user.service'
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nav_bar',
  imports: [NgIf],
  templateUrl: './nav_bar.component.html',
  styleUrl: './nav_bar.component.css',
})
export class Nav_BarComponent {
  constructor(
    private router: Router,
    private userService: UserServices,
  ) {}

  loggedInDisplay : boolean = false;
  loggedInEmail : String  = "";

  navigateToEntry() {
    this.router.navigate(['/home'])
  }

  navigateToSignIn() {
    this.userService.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/report-list'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  /*
   * convinence wrapper so logout
   * can be used in the template
   * */
  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  /*
   * check if were not logged in or not and refresh the page
   * */
  ngOnInit() {

    //subscribe to any changes in auth info to update our main page
    UserServices.authInfoChanged.asObservable().subscribe(data => {

        this.loggedInDisplay = data;
        if (data) {
          this.userService.whoami().subscribe(user=>{
            this.loggedInEmail = user.email;
          });
        }

      });



    //yes this is repetative, it could be a function,
    //but subscribers change the this context
    //so we repeat so THIS does not change,
      //and ALSO in case the event is not triggered initially
    this.userService.isLoggedIn().subscribe((data)=>{
      this.loggedInDisplay = data;
      if (data) {
        this.userService.whoami().subscribe(user=>{
          this.loggedInEmail = user.email;
        });
      }
    });
  }


}
