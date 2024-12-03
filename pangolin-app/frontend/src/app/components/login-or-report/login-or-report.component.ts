import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserServices } from '../../services/user.service'

@Component({
  selector: 'app-login-or-report',
  imports: [],
  templateUrl: './login-or-report.component.html',
  styleUrl: './login-or-report.component.css',
})
export class LoginOrReportComponent {
  constructor(
    private router: Router,
    private userService: UserServices,
  ) {}

  navigateToReport() {
    this.router.navigate(['/create-report'])
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
}
