import { Component } from '@angular/core';
import {UserServices} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private userService : UserServices, private router : Router) {}

  ngOnInit(): void {
    this.userService.logout();
    this.router.navigate(['/home'])
  }
}
