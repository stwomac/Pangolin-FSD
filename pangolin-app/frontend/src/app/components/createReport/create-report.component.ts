import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
} from '@angular/material/form-field'
import {
  MatOptionModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { Report, PaymentMethod, ReportType } from '../../models/report'
import { User } from '../../models/user'
import { ContextType } from '../../models/context-type'
import { Context } from '../../models/context'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ReportServices } from '../../services/report.service'
import { ContextServices } from '../../services/context.service'
import {UserServices} from '../../services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormField,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
})
export class CreateReportComponent {
  constructor(
    private reportService: ReportServices,
    private userService : UserServices,
    contextService: ContextServices,
    private router: Router
  ) {}
  // Available payment methods for the dropdown
  payment_methods = Object.values(PaymentMethod)
  loggedInUser: User | null = null;
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
  ]
  contextTypes: ContextType[] = [
    { contextTypeId: 0, contextName: 'None/Other', type: ReportType.OTHER },
    {
      contextTypeId: 1,
      contextName: 'Government authority or agency',
      type: ReportType.IMPERSONATOR,
    },
    {
      contextTypeId: 2,
      contextName: 'Grandchild, family member, friend',
      type: ReportType.IMPERSONATOR,
    },
    {
      contextTypeId: 3,
      contextName: 'Your boss or co-worker',
      type: ReportType.IMPERSONATOR,
    },
    {
      contextTypeId: 4,
      contextName: 'Well-known or trusted business',
      type: ReportType.IMPERSONATOR,
    },
    {
      contextTypeId: 5,
      contextName: 'Love interest',
      type: ReportType.IMPERSONATOR,
    },
    {
      contextTypeId: 6,
      contextName: 'Charity or charitable cause',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 7,
      contextName: 'Investment/seminar',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 8,
      contextName: 'Program for self/employ or start business',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 9,
      contextName: 'Franchise',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 10,
      contextName: 'Job scam, job listing or employment service',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 11,
      contextName: 'Pyramid scheme',
      type: ReportType.JOB_OPPORTUNITY,
    },
    {
      contextTypeId: 12,
      contextName: 'Computer tech support service',
      type: ReportType.SERVICE_SCAM,
    },
    {
      contextTypeId: 13,
      contextName: 'Internet service',
      type: ReportType.SERVICE_SCAM,
    },
    {
      contextTypeId: 14,
      contextName: 'Privacy or data security concern',
      type: ReportType.SERVICE_SCAM,
    },
    {
      contextTypeId: 15,
      contextName: 'Cellular or landline phone service',
      type: ReportType.SERVICE_SCAM,
    },
    {
      contextTypeId: 16,
      contextName: 'TV Service',
      type: ReportType.SERVICE_SCAM,
    },
    {
      contextTypeId: 17,
      contextName: 'Weight loss product or plan',
      type: ReportType.HEALTH_SCAM,
    },
    {
      contextTypeId: 18,
      contextName: 'Eye care',
      type: ReportType.HEALTH_SCAM,
    },
    {
      contextTypeId: 19,
      contextName: 'Any other health care problem',
      type: ReportType.HEALTH_SCAM,
    },
    {
      contextTypeId: 20,
      contextName: 'Fake or misleading medical treatment',
      type: ReportType.HEALTH_SCAM,
    },
    {
      contextTypeId: 21,
      contextName:
        'Pretending to be working with government health agency (Medicare, Medicaid)',
      type: ReportType.HEALTH_SCAM,
    },
    {
      contextTypeId: 22,
      contextName: 'Problem with online purchase or sale',
      type: ReportType.ONLINE_SHOPPING,
    },
    {
      contextTypeId: 23,
      contextName: 'Someone pretending to be a well-known online seller',
      type: ReportType.ONLINE_SHOPPING,
    },
    {
      contextTypeId: 24,
      contextName: 'Vacation or cruise',
      type: ReportType.SWEEPSTAKES,
    },
    {
      contextTypeId: 25,
      contextName: 'Money or prize',
      type: ReportType.SWEEPSTAKES,
    },
    {
      contextTypeId: 26,
      contextName: 'New auto sales experience',
      type: ReportType.AUTO_SALE,
    },
    {
      contextTypeId: 27,
      contextName: 'Auto parts or repair',
      type: ReportType.AUTO_SALE,
    },
    {
      contextTypeId: 28,
      contextName: 'Used auto sales experience',
      type: ReportType.AUTO_SALE,
    },
    {
      contextTypeId: 29,
      contextName: 'Auto warranty',
      type: ReportType.AUTO_SALE,
    },
    {
      contextTypeId: 30,
      contextName:
        'Credit repair, debt relief (including student loan debt relief)',
      type: ReportType.CREDIT_SCAM,
    },
    {
      contextTypeId: 31,
      contextName: 'Debt collection, credit card, credit reporting, or banking',
      type: ReportType.CREDIT_SCAM,
    },
    {
      contextTypeId: 32,
      contextName: 'Company charging fees to get a loan or credit card',
      type: ReportType.CREDIT_SCAM,
    },
  ]

  // Computed getter for filtered context types
  get filteredContextTypes(): ContextType[] {
    return this.contextTypes.filter(
      (contextType) => contextType.type === this.newReport.reportType,
    )
  }
  // Event handler for the "Ongoing Problem" checkbox
  onOngoingProblemChange(): void {
    if (!this.isOngoing) {
      // Reset initialDate to the value of recentDate if ongoing problem is unchecked
      this.newReport.initialDate = this.newReport.recentDate
    }
  }
  // Getter to reset contextType if no valid context found
  get needsContext(): boolean {
    const typesRequiringContext: ReportType[] = [
      ReportType.IMPERSONATOR,
      ReportType.JOB_OPPORTUNITY,
      ReportType.SERVICE_SCAM,
      ReportType.HEALTH_SCAM,
      ReportType.ONLINE_SHOPPING,
      ReportType.SWEEPSTAKES,
      ReportType.AUTO_SALE,
      ReportType.CREDIT_SCAM,
    ]
    return typesRequiringContext.includes(this.newReport.reportType)
  }
  isOngoing: boolean = false
  newContextType: ContextType | null = null
  newContext: Partial<Context> = {}
  newReport: Report = new Report({
    reportee: this.loggedInUser,
    reportType: ReportType.OTHER,
    description: '',
    paid: false,
    amount: '0',
    paymentMethod: PaymentMethod.CASH,
    initialDate: new Date(),
    recentDate: new Date(),
    isSus: false,
    isDone: false,
    annotations: [],
    contexts: [],
  })

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
       this.userService.whoami().subscribe(data => {
          console.log(data);
          this.loggedInUser = data;
       });
    } else {
      console.log("you are not logged in");
    }

    if (!this.isOngoing) {
      this.newReport.initialDate = this.newReport.recentDate
    }
  }

  saveContext(): void {
    if (this.newContextType) {
      const contextData = new Context({
        ...this.newContext,
        contextType: this.newContextType,
        report: this.newReport,
      })
      this.newReport.contexts.push(contextData)
    }
    console.log('Updated Report Context:', this.newReport.contexts)
  }
  // Save report logic
  saveReport(): void {
    this.saveContext();
    try {
      this.reportService.create(this.newReport).subscribe(console.log);
      console.log('Report to save:', this.newReport);  
      this.router.navigate(['/view1'])
    } catch (error) {
      console.log('failed to send report')
    }
  }
}
