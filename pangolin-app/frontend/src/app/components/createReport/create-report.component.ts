import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpService } from '../../services/http.service'
import { MatInputModule } from '@angular/material/input'
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
} from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { Reports, PaymentMethod } from '../../models/reports'
import { Users } from '../../models/users'
import { ContextType, ReportType } from '../../models/context-type'
import { Context } from '../../models/context'


@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormField,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class CreateReportComponent {
  constructor(private httpService: HttpService) {}
   // Available payment methods for the dropdown
   payment_methods = Object.values(PaymentMethod);
  loggedInUser: Users = new Users(2, 'anonymous@gmail.com', 'anonymous');
  report_types: { key: string; value: string }[] = [
    { key: 'IMPERSONATOR', value: 'Impersonator' },
    {
      key: 'JOB_OPPORTUNITY',
      value: 'Job, investment, money making opportunity, franchise',
    },
    { key: 'SERVICE_SCAM', value: 'Phone, internet, TV Service' },
    {
      key: 'HEALTH_SCAM',
      value: 'Health (ex. weightloss, eye care, treatment',
    },
    { key: 'ANNOYING_CALL', value: 'Just an annoying call' },
    { key: 'ONLINE_SHOPPING', value: 'Online Shopping' },
    { key: 'SWEEPSTAKES', value: 'Sweepstakes' },
    { key: 'AUTO_SALE', value: 'Auto sale, repair' },
    { key: 'CREDIT_SCAM', value: 'Credit, debt, loan' },
    { key: 'OTHER', value: 'Other' },
  ];
  contextTypes: ContextType[] = [
    new ContextType(1, 'Government authority or agency', ReportType.IMPERSONATOR),
    new ContextType(2, 'Grandchild, family member, friend', ReportType.IMPERSONATOR),
    new ContextType(3, 'Your boss or co-worker', ReportType.IMPERSONATOR),
    new ContextType(4, 'Well-known or trusted business', ReportType.IMPERSONATOR),
    new ContextType(5, 'Love interest', ReportType.IMPERSONATOR),
    new ContextType(6, 'Charity or charitable cause', ReportType.JOB_OPPORTUNITY),
    new ContextType(7, 'Investment/seminar', ReportType.JOB_OPPORTUNITY),
    new ContextType(8, 'Program for self/employ or start business', ReportType.JOB_OPPORTUNITY),
    new ContextType(9, 'Franchise', ReportType.JOB_OPPORTUNITY),
    new ContextType(10, 'Job scam, job listing or employment service', ReportType.JOB_OPPORTUNITY),
    new ContextType(11, 'Pyramid scheme', ReportType.JOB_OPPORTUNITY),
    // Add remaining mappings...
    new ContextType(0, 'None/Other', ReportType.OTHER)
  ];

  filteredContextTypes: ContextType[] = [];

  onReportTypeChange() {
    this.filteredContextTypes = this.contextTypes.filter(
      (contextType) => contextType.type === this.newReport.reportType
    );
    if (this.filteredContextTypes.length === 0) {
      this.newContextType = null; // Clear context type if none applicable
    }
  }
  newContextType: ContextType | null = null;
  newContext: Context | null = null;
  newReport: Reports = new Reports(
    0,
    this.loggedInUser,
    ReportType.OTHER,
    '',
    false,
    '0',
    PaymentMethod.CASH,
    new Date(),
    new Date(),
    false,
    false,
    [],
    []
  );

  needsContext(reportType: ReportType): boolean {
    const typesRequiringContext: ReportType[] = [
      ReportType.IMPERSONATOR,
      ReportType.JOB_OPPORTUNITY,
      ReportType.SERVICE_SCAM,
      ReportType.HEALTH_SCAM,
      ReportType.ONLINE_SHOPPING,
      ReportType.SWEEPSTAKES,
      ReportType.AUTO_SALE,
      ReportType.CREDIT_SCAM,
    ];
    return typesRequiringContext.includes(reportType);
  }


  ngOnInit(): void {
    // Simulate fetching the logged-in user
    //TODO update this.loggedInUser
  }

  // Save report logic
  saveReport(): void {
    console.log('Report to save:', this.newReport);
    // Send `this.newReport` to your backend service
  }
}
