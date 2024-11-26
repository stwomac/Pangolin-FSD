import { Component, Input } from '@angular/core'
import { PaymentMethod, Reports, Users, ReportType } from '../../models/reports';
//import { Users } from '../../models/users';
//import { ReportType } from '../../models/context-type';

let user: Users
let reportType: ReportType
let paymentMethod: PaymentMethod
let date: Date

@Component({
  selector: 'app-report',
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true
})
export class ReportComponent {
  @Input() report: Reports = new Reports(0, user , reportType, '', false, '', paymentMethod, date, date, false);
}
