import { Component, Input } from '@angular/core'
import { Report } from '../../models/report'
import { ReportServices } from '../../services/report.service'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatButton } from '@angular/material/button'
import { AnnotationSelectorComponent } from '../../annotation-selector/annotation-selector.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-report',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButton,
    AnnotationSelectorComponent,
    NgIf,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true,
})
export class ReportComponent {
  visibleAnnotationSelector: boolean = false
  message: any

  @Input() report: Report | null = null

  constructor(private apiService: ReportServices) {}
  /*
   * this function is used to connect the Annotate button to displaying the child
   * anotation selector element in the UI
   * */
  displayAnnotationSelector() {
    this.visibleAnnotationSelector = !this.visibleAnnotationSelector
  }

  updateReport() {
    console.log('updating the report!')
    if (!this.report)  return;

    this.apiService.update(this.report).subscribe((data) => {
      data
    })
    console.log('after update')

  }
}
