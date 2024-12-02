import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { LoginDto, AuthToken } from '../models/login'
import { User, UserLike } from '../models/user'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserServices extends ResourceService<User, UserLike, 'userId'> {
  constructor(
    http: HttpClient,
    private cookieService: CookieService,
  ) {
    super(http, User, '/users')
  }

  /*
   * attempts to login the given user, can fail if you get 401'ed with invalid creds
   * */
  tryLogin(username: string, password: string): Observable<AuthToken> {
    let observer = this.http.post<AuthToken>(
      `${this.resourceUrl}/login`,
      new LoginDto(username, password),
    )

    //set the authentication cookie
    observer.subscribe((data) => {
      this.cookieService.set('AuthToken', data.access_token)
    })

    //allow others to respond to the observer
    return observer
  }

  /*
   * returns true if the current user is logged in
   *
   * TODO: the server is the authority of who is logged in, this should query
   * a backend route if possible, this works for now for testing frontend stuff
   * */
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observ) => {
      observ.next(this.cookieService.check('AuthToken'))
      observ.complete()
    })
  }
}
