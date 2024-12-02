import { Component } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { ReportServices } from '../../services/report.service'
import { ReportComponent } from '../report/report.component'
import { Report } from '../../models/report'

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReportComponent,
  ],
})
export class ReportListComponent {
  reports: Report[] = []
  constructor(private apiService: ReportServices) {}
  ngOnInit() {
    this.apiService.getAll().subscribe((data) => {
      console.log(data);
      this.reports = data
    })
  }
}
