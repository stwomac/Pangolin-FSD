import { Serializable, Deserializable, OptionalId } from './utils/serializable'

export interface AnnotationLike {
  annotationId: number
  annotation: string
}

@Deserializable<Annotation, AnnotationLike, 'annotationId'>()
export class Annotation
  extends Serializable<AnnotationLike, 'annotationId'>
  implements OptionalId<AnnotationLike, 'annotationId'>
{
  public readonly annotationId?: number
  public annotation: string

  constructor(data: OptionalId<AnnotationLike, 'annotationId'>) {
    super('annotationId')
    this.annotationId = data.annotationId
    this.annotation = data.annotation
  }

  public override toJson() {
    const { idPropKey, ...annoationLike } = this
    return annoationLike
  }

  public static parse(data: AnnotationLike) {
    return new Annotation(data)
  }
}
