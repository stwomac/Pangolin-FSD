import { NgIf } from '@angular/common'
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core'
import { AnnotationServices } from '../services/annoation.service'
import { Annotation } from '../models/annotation'
import { Report } from '../models/report'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatButton } from '@angular/material/button'
import { ReportServices } from '../services/report.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-annotation-selector',
  imports: [
    NgIf,
    MatCheckbox,
    MatButton,
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './annotation-selector.component.html',
  styleUrl: './annotation-selector.component.css',
})
export class AnnotationSelectorComponent implements OnInit {
  constructor(
    private annotationServices: AnnotationServices,
    private reportServices: ReportServices,
  ) {}

  //mapped to an ngIf for visibility, see the setter getters :)
  private isVisible: boolean = false

  //this is the report that we are going to edit when saving and loading
  @Input() report: Report | null = null

  txtAnnotation: FormControl = new FormControl('txtAnnotation')

  get visible(): boolean {
    return this.isVisible
  }
  @Input() set visible(value: boolean) {
    this.isVisible = value
  }


  //update our report
  updateReport() {
    if (this.report) this.reportServices.update(this.report)
  }

  checkBoxInputChanged(event: any) {
    if (!this.report) return

    if (!event.event.target.checked)
      this.report.annotations = this.report.annotations.filter(
        (ele) => ele.annotation !== event.annotation.annotation,
      )
    else if (
      !this.report.annotations.some(
        (ele) => ele.annotation === event.annotation.annotation,
      )
    )
      this.report.annotations.push(event.annotation)
  }


  addAnotation() {
    if (!this.report) return

    this.report.annotations.push(
      Annotation.fromString(this.txtAnnotation.value, this.report?.reportId),
    )

    //clear out the input for convinence
    this.txtAnnotation.setValue('')
  }

  ngOnInit(): void {
    this.txtAnnotation.setValue('')
  }
}
