import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Serializable, DeserializableType } from '../models/utils/serializable'

export abstract class ResourceService<
  ModelType extends Serializable<DataType, keyof DataType>,
  DataType,
  IdKey extends keyof DataType,
> {
  protected baseUrl = 'http://localhost:3000'
  protected resourceUrl: string

  protected constructor(
    protected http: HttpClient,
    private Model: DeserializableType<ModelType, DataType, IdKey>,
    urlPath: `/${string}`,
  ) {
    this.resourceUrl = this.baseUrl + urlPath
  }

  public get(id: number): Observable<ModelType> {
    return this.http
      .get<DataType>(`${this.resourceUrl}/${id}`)
      .pipe(map((result) => this.Model.parse(result)))
  }

  public getAll(): Observable<ModelType[]> {
    return this.http
      .get<DataType[]>(`${this.resourceUrl}`)
      .pipe(map((result) => result.map((data) => this.Model.parse(data))))
  }

  public create(resource: ModelType): Observable<ModelType> {
    return this.http
      .post<DataType>(`${this.resourceUrl}`, resource.toJson())
      .pipe(map((result) => this.Model.parse(result)))
  }

  public update(resource: ModelType): Observable<ModelType> {
    const id = resource[resource.idPropKey as keyof ModelType]
    if (id === undefined)
      throw new UnsavedModelError(ResourceService.prototype.create.name)
    return this.http
      .put<DataType>(`${this.resourceUrl}/${id}`, resource.toJson())
      .pipe(map((result) => this.Model.parse(result)))
  }

  public delete(resource: ModelType): Observable<void> {
    const id = resource[resource.idPropKey as keyof ModelType]
    if (id === undefined)
      throw new UnsavedModelError(ResourceService.prototype.delete.name)
    return this.http.delete<void>(`${this.resourceUrl}/${id}`)
  }
}

class UnsavedModelError extends Error {
  constructor(methodName: string) {
    super(
      `'The ${methodName} method can only be called after models that have already been created.'`,
    )
  }
}
