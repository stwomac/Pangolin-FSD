import { Routes } from '@angular/router'
import { LoginOrReportComponent } from '../app/components/login-or-report/login-or-report.component' 
import { CreateReportComponent } from './components/createReport/create-report.component'
import { LoginComponent } from './components/login/login.component'
import { Nav_BarComponent } from './components/nav_bar/nav_bar.component'
import { ReportComponent } from './components/report/report.component'
import { ReportListComponent } from './components/report-list/report-list.component'

export const routes: Routes = [

    {
        path: 'view1',
        component: LoginOrReportComponent
    },
    {
        path: 'create-report',
        component: CreateReportComponent
    },
    {
        path: 'report',
        component: ReportComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'report-list',
        component: ReportListComponent
    }
]
