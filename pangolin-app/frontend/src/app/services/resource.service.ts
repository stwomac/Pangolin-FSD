import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Serializable, Deserializable } from '../models/utils/serializable'

export abstract class ResourceService<T, M extends Serializable<T>> {
  private baseUrl = 'http://localhost:3000'
  protected resourceUrl: string

  protected constructor(
    protected http: HttpClient,
    private model: Deserializable<T, M>,
    urlPath: `/${string}`,
  ) {
    this.resourceUrl = this.baseUrl + urlPath
  }

  public get(id: number): Observable<M> {
    return this.http
      .get<T>(`${this.resourceUrl}/${id}`)
      .pipe(map((result) => new this.model(result)))
  }

  public getAll(): Observable<M[]> {
    return this.http
      .get<T[]>(`${this.resourceUrl}`)
      .pipe(map((result) => result.map((data) => new this.model(data))))
  }

  public create(resource: Serializable<T>): Observable<M> {
    return this.http
      .post<T>(`${this.resourceUrl}`, resource.toJson())
      .pipe(map((result) => new this.model(result)))
  }

  public update(resource: Serializable<T>): Observable<M> {
    return this.http
      .put<T>(`${this.resourceUrl}/${resource.id}`, resource.toJson())
      .pipe(map((result) => new this.model(result)))
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`)
  }
}
