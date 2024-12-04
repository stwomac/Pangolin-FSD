import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { Report } from '../models/report'
import { Component, Input } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-report-description-editor',
  imports: [
    NgIf,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './report-description-editor.component.html',
  styleUrl: './report-description-editor.component.css',
})
export class ReportDescriptionEditorComponent {
  @Input() report: Report | null = null
  @Input() visible: boolean = false

  txtDescriptionEditor: FormControl = new FormControl('')
  placeholder: string = ''
  ngOnInit() {
    if (!this.report) return
    this.txtDescriptionEditor.valueChanges.subscribe((data) => {
      console.log(this)
      if (!this.report) return
      this.report.description = data
    })
    //this.placeholder = this.report.description;
  }
}
