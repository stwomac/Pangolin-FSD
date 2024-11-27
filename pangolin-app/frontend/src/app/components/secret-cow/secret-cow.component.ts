import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secret-cow',
  imports: [],
  templateUrl: './secret-cow.component.html',
  styleUrl: './secret-cow.component.css'
})
export class SecretCowComponent implements OnInit  {

  constructor(private httpClient : HttpClient) {
    this.secret = "";
  }

  secret : string;

  ngOnInit(): void {
    this.httpClient.get<{cow : string}>('http://localhost:3000/users/secrets').subscribe(data => {
      this.secret = data.cow;
    });
  }
}
