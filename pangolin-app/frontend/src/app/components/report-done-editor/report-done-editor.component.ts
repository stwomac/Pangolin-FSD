import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Report } from '../../models/report';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-report-done-editor',
  imports: [NgIf, MatCheckboxModule,ReactiveFormsModule, MatFormField],
  templateUrl: './report-done-editor.component.html',
  styleUrl: './report-done-editor.component.css'
})
export class ReportDoneEditorComponent {
  @Input() report: Report | null = null; // The report to edit
  @Input() visible: boolean = false; // Controls visibility of the editor

  chkIsDoneEditor: FormControl = new FormControl(false); // Form control for the checkbox

  ngOnInit() {
    if (!this.report) return;
    // Initialize the checkbox value based on the current state of report.isSus
    this.chkIsDoneEditor.setValue(this.report.isDone);

    // Subscribe to changes in the checkbox and update the report field
    this.chkIsDoneEditor.valueChanges.subscribe((value) => {
      if (this.report) {
        this.report.isDone = value;
      }
    });
  }
}
