import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Report } from '../../models/report';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';



@Component({
  selector: 'app-report-sus-editor',
  imports: [NgIf, MatCheckboxModule, ReactiveFormsModule, MatFormField],
  templateUrl: './report-sus-editor.component.html',
  styleUrl: './report-sus-editor.component.css',
})
export class ReportSusEditorComponent {
  @Input() report: Report | null = null; // The report to edit
  @Input() visible: boolean = false; // Controls visibility of the editor

  chkIsSusEditor: FormControl = new FormControl(false); // Form control for the checkbox

  ngOnInit() {
    if (!this.report) return;
    // Initialize the checkbox value based on the current state of report.isSus
    this.chkIsSusEditor.setValue(this.report.isSus);

    // Subscribe to changes in the checkbox and update the report field
    this.chkIsSusEditor.valueChanges.subscribe((value) => {
      console.log(this)
      if (this.report) {
        this.report.isSus = value;
      }
    });
  }
}
