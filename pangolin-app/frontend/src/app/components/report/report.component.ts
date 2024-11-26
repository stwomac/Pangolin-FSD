import { Component, Input } from '@angular/core'
import { PaymentMethod, Reports } from '../../models/reports';
import { Users } from '../../models/users';
import { ReportType } from '../../models/context-type';

let user: Users
let reportType: ReportType
let paymentMethod: PaymentMethod
let date: Date

@Component({
  selector: 'app-report',
  imports: [Reports, Users],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  @Input() report: Reports = new Reports(0, user , reportType, '', false, '', paymentMethod, date, date, false);
}
