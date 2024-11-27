import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResourceService } from './resource.service'
import { Report, ReportLike } from '../models/report'

@Injectable({ providedIn: 'root' })
export class ReportServices extends ResourceService<ReportLike, Report> {
  constructor(http: HttpClient) {
    super(http, Report, '/reports')
  }
}
