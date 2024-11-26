import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { Annotation, AnnotationLike } from '../models/annotation'

@Injectable({ providedIn: 'root' })
export class AnnotationServices extends ResourceService<
  AnnotationLike,
  Annotation
> {
  constructor(http: HttpClient) {
    super(http, Annotation, '/annotations')
  }
}
