import { Component, Input } from '@angular/core'
import { Report, ReportLike, ReportType, User, Annotation, PaymentMethod } from '../../models/reports';
import { Context } from '../../models/context';
import { ReportServices } from '../../services/report.service';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
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
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true
})
export class ReportComponent {
  message:any;
  @Input() report: ReportLike = {
    reportId: 1,
    reportee: user,
    reportType: reportType,
    description: 'Report',
    paid: false,
    amount: '',
    paymentMethod: paymentMethod,
    isSus: false,
    isDone: false,
    annotations: annotation,
    contexts: contexts
  }
  constructor(private apiService: ReportServices) { };
   ngOnInit() {
     this.apiService.get(1).subscribe(data => {
         this.message = data;
         console.log(this.message)
     });
   } 
}
