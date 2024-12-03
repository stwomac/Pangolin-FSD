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
import { UserServices } from '../../services/user.service'
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
    private userService: UserServices,
    private contextService: ContextServices,
    private router: Router,
  ) {}
  // Available payment methods for the dropdown
  payment_methods = Object.values(PaymentMethod)
  loggedInUser: User | null = null
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
  contextTypes: ContextType[] = []

  // Computed getter for filtered context types
  get filteredContextTypes(): ContextType[] {
    return this.contextTypes.filter(
      (contextType) => contextType.reportType === this.newReport.reportType,
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
    this.contextService.getTypes().subscribe((data) => {
      this.contextTypes = data
      console.log(this.contextTypes)
    })
    if (this.userService.isLoggedIn()) {
      this.userService.whoami().subscribe((data) => {
        console.log(data)
        this.loggedInUser = data
      })
    } else {
      console.log('you are not logged in')
    }

    if (!this.isOngoing) {
      this.newReport.initialDate = this.newReport.recentDate
    }
  }

  saveReport(): void {
    try {
      if (this.newContextType) {
        const contextData = new Context({
          ...this.newContext,
          contextTypeId: this.newContextType.contextTypeId,
          report: this.newReport,
        })
        this.newReport.contexts.push(contextData)
      }
      this.reportService.create(this.newReport).subscribe()
      this.router.navigate(['/view1'])
    } catch (error) {
      console.log('failed to send report')
    }
  }
}
