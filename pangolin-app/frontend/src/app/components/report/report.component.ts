import { Component, Input } from '@angular/core'
import { Report, ReportLike, ReportType, User, Annotation, PaymentMethod } from '../../models/reports';
import { Context } from '../../models/context';
import { ReportServices } from '../../services/report.service';
//import { Users } from '../../models/users';
//import { ReportType } from '../../models/context-type';
let reportlike :ReportLike
let user:User
let reportType:ReportType
let annotation:Annotation
let paymentMethod:PaymentMethod
let contexts:Context
@Component({
  selector: 'app-report',
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true
})
export class ReportComponent {
  
  //constructor(private apiService: ReportServices) { };
  // ngOnInit() {
  //   this.apiService.getMessage().subscribe(data => {
  //       this.message = data;
  //       console.log(this.message)
  //   });
  // } 
  @Input() report: ReportLike = {
    reportId: 1,
    reportee: user,
    reportType: reportType,
    description: '',
    paid: false,
    amount: '',
    paymentMethod: paymentMethod,
    isSus: false,
    isDone: false,
    annotations: annotation,
    contexts: contexts
  }
}
