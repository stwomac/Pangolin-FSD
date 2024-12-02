import { NgIf } from '@angular/common'
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core'
import { AnnotationServices } from '../services/annoation.service'
import { Annotation } from '../models/annotation'
import { Report } from '../models/report'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatButton } from '@angular/material/button'
import { ReportServices } from '../services/report.service'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'

@Component({
  selector: 'app-annotation-selector',
  imports: [NgIf, MatCheckbox, MatButton,ReactiveFormsModule,MatInputModule,MatButton],
  templateUrl: './annotation-selector.component.html',
  styleUrl: './annotation-selector.component.css',
})
export class AnnotationSelectorComponent implements OnInit {
  constructor(
    private annotationServices: AnnotationServices,
    private reportServices: ReportServices
  ) {}

  //mapped to an ngIf for visibility, see the setter getters :)
  private isVisible: boolean = false;

  //this is the report that we are going to edit when saving and loading
  @Input() report: Report | null = null;


  @Output() onSave : EventEmitter<this> = new EventEmitter<this>();
  @Output() onCancel : EventEmitter<this> = new EventEmitter<this>();

  //this is the buffer report that we do most of our work in
  //before saving
  bufferReport : Report | null = null;

  txtAnnotation : FormControl = new FormControl('txtAnnotation');

  get visible(): boolean {
    return this.isVisible
  }
  @Input() set visible(value: boolean) {
    this.isVisible = value
  }

  save() {
    this.pushBuffer();
    this.visible = false;
    this.onSave.emit(this);
  }

  cancel() {
    this.pullBuffer();
    this.visible = false;
    this.onCancel.emit(this);
  }

  //update our report
  updateReport() {
    if (this.report) this.reportServices.update(this.report)
  }

  checkBoxInputChanged(event: any) {
    if (!this.report || !this.bufferReport) return

    if (!event.event.target.checked)
      this.bufferReport.annotations = this.bufferReport.annotations.filter(
        (ele) => ele.annotation !== event.annotation.annotation,
      )
    else if (
      !this.bufferReport.annotations.some(
        (ele) => ele.annotation === event.annotation.annotation,
      )
    )
      this.bufferReport.annotations.push(event.annotation)
  }

  /*
   * pulls the primary report into the buffer report
  * */
  pullBuffer() {
    if (this.report)
      {
        this.bufferReport = {...this.report};
        this.bufferReport.annotations = this.report.annotations.slice(0); //copy the array so we don't have a pointer to the same ref
      }
  }

  /*
   * saves the buffer
  * */
  pushBuffer() {
    if (!this.bufferReport || !this.report) return

    this.report.annotations = this.bufferReport.annotations;

    //we don't want changes to the buffer to instantly be reflected in the report
    //so we pull to induce the copy code and prevent reference syncing
    this.pullBuffer();
  }

  addAnotation() {
    if (!this.bufferReport) return;

    this.bufferReport.annotations.push(
      Annotation.fromString(this.txtAnnotation.value,this.report?.reportId)
    );

    //clear out the input for convinence
    this.txtAnnotation.setValue("");
  }

  ngOnInit() : void {
    this.pullBuffer();
    this.txtAnnotation.setValue("");
  }
}
