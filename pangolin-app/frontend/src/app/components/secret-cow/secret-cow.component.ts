import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {UserServices} from '../../services/user.service';

@Component({
  selector: 'app-secret-cow',
  imports: [],
  templateUrl: './secret-cow.component.html',
  styleUrl: './secret-cow.component.css'
})
export class SecretCowComponent implements OnInit  {

  constructor(private httpClient : HttpClient,private userService : UserServices) {
    this.secret = "";
    this.txtIsLoggedIn = "move along, there is nothing to see here";
  }

  secret : string;
  txtIsLoggedIn : string;

  ngOnInit(): void {
    this.httpClient.get<{cow : string}>('http://localhost:3000/users/secrets').subscribe(data => {
      this.secret = data.cow;
    });

    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.txtIsLoggedIn = "BEHOLD THE SECRET COW!";
      } else {
        this.txtIsLoggedIn = "move along, there is nothing to see here";
      }
    })
  }
}
