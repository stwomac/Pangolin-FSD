import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserServices } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserServices, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          // Redirect to 'home' if not logged in
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
