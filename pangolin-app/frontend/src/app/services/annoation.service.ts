import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import {
  Annotation,
  AnnotationLike,
  ApiAnnotationModel,
} from '../models/annotation'

@Injectable({ providedIn: 'root' })
export class AnnotationServices extends ResourceService<
  Annotation,
  AnnotationLike,
  ApiAnnotationModel
> {
  constructor(http: HttpClient) {
    super(http, Annotation, 'annotationId', '/annotations')
  }
}
