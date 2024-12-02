import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Deserializable } from '../models/utils/serializable'

export abstract class ResourceService<ModelType, DataType, ApiDataModel> {
  protected baseUrl = 'http://localhost:3000'
  protected resourceUrl: string

  protected constructor(
    protected http: HttpClient,
    private Model: Deserializable<ModelType, DataType, ApiDataModel>,
    private idPropKey: keyof ModelType,
    urlPath: `/${string}`,
  ) {
    this.resourceUrl = this.baseUrl + urlPath
  }

  public get(id: number): Observable<ModelType> {
    return this.http
      .get<ApiDataModel>(`${this.resourceUrl}/${id}`)
      .pipe(map((result) => new this.Model(result)))
  }

  public getAll(): Observable<ModelType[]> {
    return this.http
      .get<ApiDataModel[]>(`${this.resourceUrl}`)
      .pipe(map((result) => result.map((data) => new this.Model(data))))
  }

  public create(resource: ModelType): Observable<ModelType> {
    return this.http
      .post<ApiDataModel>(`${this.resourceUrl}`, resource)
      .pipe(map((result) => new this.Model(result)))
  }

  public update(resource: ModelType): Observable<ModelType> {
    return this.http
      .put<ApiDataModel>(`${this.resourceUrl}`, resource)
      .pipe(map((result) => new this.Model(result)))
  }

  public delete(resource: ModelType): Observable<void> {
    const id = resource[this.idPropKey]
    if (resource[this.idPropKey] === undefined)
      throw new Error(
        `The delete method can only be called after models that have already been created.`,
      )
    return this.http.delete<void>(`${this.resourceUrl}/${id}`)
  }
}
