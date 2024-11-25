import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Users } from '../models/users/users'
import { Type } from '../models/type/type'

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

  //type methods

  //get type/
  getAllType(): Observable<HttpResponse<Type[]>> {
    return this.http.get<Type[]>(this.baseURL + 'type', { observe: 'response' })
  }
  //get type/:id
  getTypeById(type_id: number): Observable<HttpResponse<Type>> {
    return this.http.get<Type>(this.baseURL + 'type' + type_id, {
      observe: 'response',
    })
  }
}
