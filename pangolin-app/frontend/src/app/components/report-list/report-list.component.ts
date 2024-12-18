import { Component } from '@angular/core'
import { AsyncPipe, CommonModule } from '@angular/common'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { ReportServices } from '../../services/report.service'
import { ReportComponent } from '../report/report.component'
import { Report, ReportType } from '../../models/report'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'
import { MatOptionModule } from '@angular/material/core'
import { User } from '../../models/user'
import { UserServices } from '../../services/user.service'

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    ReportComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class ReportListComponent {
  loggedInUser: User | null = null
  isAdmin: Boolean = false
  //reports array to store reports in from API
  reports: Report[] = []
  reportType: ReportType | null = null
  //all Report Types to use for binding to local report
  allReportTypes: { key: string; value: string }[] = [
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
  // Computed getter for filtered context types
  get filteredReports(): Report[] {
    if (this.reportType) {
      return this.reports.filter(
        (report) => report.reportType === this.reportType?.valueOf(),
      )
    } else {
      return this.reports
    }
  }
  constructor(
    private apiService: ReportServices,
    private userService: UserServices,
  ) {}
  ngOnInit() {
    //Populate reports on init
    this.apiService.getAll().subscribe((data) => {
      this.reports = data
    })
    if (this.userService.isLoggedIn()) {
      this.userService.whoami().subscribe((data) => {
        this.loggedInUser = data
        if(this.loggedInUser.role == "admin")
          this.isAdmin = true
      })
    } else {
      console.log('you are not logged in')
    }
  }
  // Function to track items by their unique ID
  trackByReportId(index: number, report: Report): number | undefined {
    return report.reportId // Ensure 'reportId' is unique for each report
  }
}
