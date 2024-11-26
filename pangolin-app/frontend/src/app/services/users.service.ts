import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { User, UserLike } from '../models/users'

@Injectable({ providedIn: 'root' })
export class UserServices extends ResourceService<UserLike, User> {
  constructor(http: HttpClient) {
    super(http, User, '/users')
  }
}
