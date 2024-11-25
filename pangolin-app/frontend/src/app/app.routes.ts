import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { CreateReportComponent } from './components/createReport/create-report.component';

export const routes: Routes = [
    {
        path: 'create-report',
        component: CreateReportComponent
    },
    {
        path: "app-login", 
        component: LoginComponent
    }
]
