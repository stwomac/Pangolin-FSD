import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { Report, ReportLike, ApiReportModel } from '../models/report'

@Injectable({ providedIn: 'root' })
export class ReportServices extends ResourceService<
  Report,
  ReportLike,
  ApiReportModel
> {
  constructor(http: HttpClient) {
    super(http, Report, 'reportId', '/reports')
  }
}
