import { Component, Input } from '@angular/core'
import { Report } from '../../models/report'
import { ReportServices } from '../../services/report.service'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatButton } from '@angular/material/button'
import { AnnotationSelectorComponent } from '../../annotation-selector/annotation-selector.component'
import { NgIf } from '@angular/common'
import {ReportDescriptionEditorComponent} from '../../report-description-editor/report-description-editor.component'

@Component({
  selector: 'app-report',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButton,
    AnnotationSelectorComponent,
    ReportDescriptionEditorComponent,
    NgIf,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  standalone: true,
})
export class ReportComponent {
  updateMode: boolean = false
  message: any

  @Input() report: Report | null = null
  bufferReport : Report | null = null;

  constructor(private apiService: ReportServices) {}
  /*
   * this function is used to connect the Annotate button to displaying the child
   * anotation selector element in the UI
   * */
  displayAnnotationSelector() {
    this.updateMode = !this.updateMode
  }

  toggleEditMode() {
    this.updateMode = !this.updateMode;
  }

  cancel() {
    this.pullBuffer()
    this.toggleEditMode();
  }


  /*
   * pulls the primary report into the buffer report
   * */
  pullBuffer() {
    if (!this.report) return;

    this.bufferReport = new Report({...this.report});
    this.bufferReport.annotations = this.report.annotations.slice(0) //copy the array so we don't have a pointer to the same ref

  }

  /*
   * saves the buffer
   * */
  pushBuffer() {
    if (!this.bufferReport) return
    this.report = new Report({...this.bufferReport});
    this.report.annotations = this.bufferReport.annotations;
  }
  updateReport() {
    console.log(this.report);
    if (!this.report) return

    this.apiService.update(this.report).subscribe((data) => {
      data
    });
  }

  ngOnInit() {
    if (!this.report) return;

      //copy over the report to a buffer for save reset functionality
      this.bufferReport = new Report({...this.report});
      this.bufferReport.annotations = this.report.annotations.slice(0)
  }

  save() {
    this.pushBuffer();
    this.toggleEditMode();
    this.updateReport();
  }


}
