import { Component, Input } from '@angular/core'
import { Report, ReportLike, ReportType, User, Annotation, PaymentMethod } from '../../models/report';
import { Context } from '../../models/context';
import { ReportServices } from '../../services/report.service';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import {AnnotationSelectorComponent} from '../../annotation-selector/annotation-selector.component';
import {NgIf} from '@angular/common';
//import { Users } from '../../models/users';
//import { ReportType } from '../../models/context-type';
let user:User
let reportType:ReportType
let annotation:Annotation[]
let paymentMethod:PaymentMethod
let contexts:Context[]

@Component({
  selector: 'app-report',
  imports: [MatCardModule, MatChipsModule, MatButton,AnnotationSelectorComponent,NgIf],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true
})
export class ReportComponent {

  visibleAnnotationSelector : boolean = false
  message:any;

  @Input() getID!: number;

  report: Report | null = null;

  constructor(private apiService: ReportServices) { };
   ngOnInit() {
     this.apiService.get(this.getID).subscribe(data => {
       this.report = data;
     });
   }
   /*
    * this function is used to connect the Annotate button to displaying the child
    * anotation selector element in the UI
    * */
   displayAnnotationSelector() {
     this.visibleAnnotationSelector = !this.visibleAnnotationSelector;
   }

   updateReport() {
     console.log("updating the report!")
     if (this.report) {
        this.apiService.update(this.report).subscribe(data => {data});
        console.log("after update");
      }
   }
}
