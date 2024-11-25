import { Reports } from '../reports/reports'

export class Annotation {
  constructor(
    public annotation_id: number,
    public annotation: string,
    public report: Reports,
  ) {}
}
