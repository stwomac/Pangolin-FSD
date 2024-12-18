import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ResourceService } from './resource.service'
import { Context, ContextLike, ApiContextModel } from '../models/context'
import { ContextType } from '../models/context-type'

@Injectable({ providedIn: 'root' })
export class ContextServices extends ResourceService<
  Context,
  ContextLike,
  ApiContextModel
> {
  constructor(http: HttpClient) {
    super(http, Context, 'contextId', '/contexts')
  }

  public getTypes(): Observable<ContextType[]> {
    return this.http.get<ContextType[]>(`${this.baseUrl}/context-types`)
  }
}
