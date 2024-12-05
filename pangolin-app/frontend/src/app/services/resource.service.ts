import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Deserializable } from '../models/utils/serializable'

//this class is inherited by each model class to make creating a service easy
//subclasses only need to pass the model and the routes
export abstract class ResourceService<ModelType, DataType, ApiDataModel> {
  protected baseUrl = 'http://localhost:3000'
  protected resourceUrl: string
  protected constructor(
    protected http: HttpClient,
    private Model: Deserializable<ModelType, DataType, ApiDataModel>,
    private idPropKey: keyof ModelType,
    urlPath: `/${string}`,
  ) {
    //map the base URL passed in to create the full path of the subclass
    this.resourceUrl = this.baseUrl + urlPath
  }

  //get by id blueprint, takes in a model and an id
  public get(id: number): Observable<ModelType> {
    return this.http
      .get<ApiDataModel>(`${this.resourceUrl}/${id}`)
      .pipe(map((result) => new this.Model(result)))
  }

  //get all blueprint, takes in a model, maps response to model
  public getAll(): Observable<ModelType[]> {
    return this.http
      .get<ApiDataModel[]>(`${this.resourceUrl}`)
      .pipe(map((result) => result.map((data) => new this.Model(data))))
  }

  //create blueprint, takes in a model, maps response to model
  public create(resource: ModelType): Observable<ModelType> {
    return this.http
      .post<ApiDataModel>(`${this.resourceUrl}`, resource)
      .pipe(map((result) => new this.Model(result)))
  }

  //update blueprint, takes in a model, maps response to model
  public update(resource: ModelType): Observable<ModelType> {
    return this.http
      .put<ApiDataModel>(`${this.resourceUrl}`, resource)
      .pipe(map((result) => new this.Model(result)))
  }

  //delete blueprint, takes in a model, maps response to model
  public delete(resource: ModelType): Observable<void> {
    const id = resource[this.idPropKey]
    if (resource[this.idPropKey] === undefined)
      throw new Error(
        `The delete method can only be called after models that have already been created.`,
      )
    return this.http.delete<void>(`${this.resourceUrl}/${id}`)
  }
}
