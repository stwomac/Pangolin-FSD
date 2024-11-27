import { Routes } from '@angular/router'
import { LoginOrReportComponent } from '../app/components/login-or-report/login-or-report.component'
import { CreateReportComponent } from './components/createReport/create-report.component'
import {LoginComponent} from './components/login/login.component'

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
      path: 'login',
      component: LoginComponent
    }
]
