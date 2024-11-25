import { Reports } from '../reports/reports'

export class Annotation {
  constructor(annotation_id: number, annotation: string, report: Reports) {
    this.annotation_id = annotation_id
    this.annotation = annotation
    this.report = report
  }
  annotation_id: number
  annotation: string
  report: Reports
}
