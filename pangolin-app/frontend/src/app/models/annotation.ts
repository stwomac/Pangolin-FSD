import { Serializable } from './utils/serializable'

export interface AnnotationLike {
  annotationId: number
  annotation: string
}

export class Annotation
  extends Serializable<AnnotationLike>
  implements Omit<AnnotationLike, 'annotationId'>
{
  annotation: string

  constructor(data: AnnotationLike) {
    super(data.annotationId)
    this.annotation = data.annotation
  }

  public override toJson(): AnnotationLike {
    const { id, ...annoationLike } = this
    return { ...annoationLike, annotationId: id }
  }
}
