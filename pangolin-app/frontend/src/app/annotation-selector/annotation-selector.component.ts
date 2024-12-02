import { NgIf } from '@angular/common'
import { Input, Component } from '@angular/core'
import { AnnotationServices } from '../services/annoation.service'
import { Annotation } from '../models/annotation'
import { Report } from '../models/report'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatButton } from '@angular/material/button'
import { ReportServices } from '../services/report.service'

@Component({
  selector: 'app-annotation-selector',
  imports: [NgIf, MatCheckbox, MatButton],
  templateUrl: './annotation-selector.component.html',
  styleUrl: './annotation-selector.component.css',
})
export class AnnotationSelectorComponent {
  constructor(
    private annotationServices: AnnotationServices,
    private reportServices: ReportServices,
  ) {}

  //mapped to an ngIf for visibility, see the setter getters :)
  private isVisible: boolean = false

  //this is the primary list displayed out to the user
  annotationList: Array<Annotation> = []

  //report we are adding anotations to, if any
  @Input() report: Report | null = null

  shouldBeChecked(annotation: Annotation): boolean {
    if (!this.report) {
      return false
    }

    //the lack of functioning id's makes me sad :(
    return this.report.annotations.some(
      (ele) => ele.annotation === annotation.annotation,
    )
  }

  get visible(): boolean {
    return this.isVisible
  }
  @Input() set visible(value: boolean) {
    //we don't want to re-ping the database
    if (value && this.annotationList.length < 1) {
      this.annotationServices.getAll().subscribe((data) => {
        this.annotationList = data
      })
    }
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
}
