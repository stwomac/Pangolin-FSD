import { Routes } from '@angular/router'
import { LoginOrReportComponent } from '../app/components/login-or-report/login-or-report.component' 
import { CreateReportComponent } from './components/createReport/create-report.component'

export const routes: Routes = [

    {
        path: 'view1',
        component: LoginOrReportComponent
    },
    {
        path: 'create-report',
        component: CreateReportComponent
    }
]
