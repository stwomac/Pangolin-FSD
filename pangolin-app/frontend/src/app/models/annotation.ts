import { Deserializable } from './utils/serializable'

export interface ApiAnnotationModel {
  annotationId: number
  annotation: string
  reportId? : number
}

export interface AnnotationLike
  extends Omit<ApiAnnotationModel, 'annotationId'> {
  annotationId?: number
  reportId? : number
}

@Deserializable<Annotation, AnnotationLike, ApiAnnotationModel>()
export class Annotation implements AnnotationLike {
  public readonly annotationId?: number
  public readonly reportId?: number
  public annotation: string

  constructor(data: AnnotationLike | ApiAnnotationModel) {
    this.annotationId = data.annotationId
    this.annotation = data.annotation
    this.reportId = data.reportId;
  }

  static fromString(annotationString : string,reportId ? : number) {

    let annotation = new Annotation({
                          annotationId: undefined,
                          annotation: annotationString,
                          reportId : reportId
      });
      console.log("returning new annotation");
      console.log(annotation);
      console.log(reportId);
      return annotation;
  }
}
