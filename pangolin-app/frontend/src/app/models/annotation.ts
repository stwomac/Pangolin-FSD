import { Deserializable } from './utils/serializable'

export interface ApiAnnotationModel {
  annotationId: number
  annotation: string
}

export interface AnnotationLike
  extends Omit<ApiAnnotationModel, 'annotationId'> {
  annotationId?: number
}

@Deserializable<Annotation, AnnotationLike, ApiAnnotationModel>()
export class Annotation implements AnnotationLike {
  public readonly annotationId?: number
  public annotation: string

  constructor(data: AnnotationLike | ApiAnnotationModel) {
    this.annotationId = data.annotationId
    this.annotation = data.annotation
  }

  static fromString(annotationString : string) {
    return new Annotation({
                          annotationId: undefined,
                          annotation: annotationString
      });
  }
}
