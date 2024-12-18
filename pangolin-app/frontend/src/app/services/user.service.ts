import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { LoginDto, AuthToken } from '../models/login'
import { User, UserLike, ApiUserModel } from '../models/user'
import { CookieService } from 'ngx-cookie-service'
import { map, Observable, ObservableLike, Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserServices extends ResourceService<
  User,
  UserLike,
  ApiUserModel
> {
  constructor(
    http: HttpClient,
    private cookieService: CookieService,
  ) {
    super(http, User, 'userId', '/users')
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

      UserServices.authInfoChanged.next(true);

    })

    //allow others to respond to the observer
    return observer
  }

  /*
   * removes the auth token from memory,
   * TODO: this should also purge the token from the backend,
   * but this works for now as a quick fix
  *
  * */
  logout() {
    this.cookieService.delete("AuthToken");
    UserServices.authInfoChanged.next(false);
  }

  trySignUp(email: string, password: string): Observable<any> {
    return this.http.post(`${this.resourceUrl}`, {
      email: email,
      password: password,
    })
  }

  /*
   * returns the user that is currently logged in from the back end
   * if the user is not authenticated this WILL fail, you have been warned *^*
   * */
  whoami(): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/whoami`).pipe(
      map((result) => {
        return new User(result)
      }),
    )
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

  static authInfoChanged : Subject<boolean> = new Subject<boolean>();
}
