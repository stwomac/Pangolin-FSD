import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { User, UserLike } from '../models/users'
import { LoginDto,AuthToken } from '../models/login'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserServices extends ResourceService<UserLike, User> {
  constructor(http: HttpClient) {
    super(http, User, '/users')
  }

  login(username : string , password : string) : Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.resourceUrl}/login`,new LoginDto(username,password));
  }
}
