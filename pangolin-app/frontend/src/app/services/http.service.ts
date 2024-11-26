import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Users } from '../models/users'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  baseURL: string = 'http://localhost:3000/'

  //users methods

  //get users/
  getAllUsers(): Observable<HttpResponse<Users[]>> {
    return this.http.get<Users[]>(this.baseURL + 'users', {
      observe: 'response',
    })
  }
}
