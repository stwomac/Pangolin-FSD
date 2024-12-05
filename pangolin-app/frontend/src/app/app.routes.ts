import { Routes } from '@angular/router'
import { LoginOrReportComponent } from '../app/components/login-or-report/login-or-report.component'
import { CreateReportComponent } from './components/createReport/create-report.component'
import { LoginComponent } from './components/login/login.component'
import { Nav_BarComponent } from './components/nav_bar/nav_bar.component'
import { ReportComponent } from './components/report/report.component'
import { ReportListComponent } from './components/report-list/report-list.component'
import { SecretCowComponent } from './components/secret-cow/secret-cow.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { AuthGuard } from './guards/auth.guard'
import {LogoutComponent} from './logout/logout.component'

export const routes: Routes = [
  {
    path: 'home',
    component: LoginOrReportComponent,
  },
  {
    path: 'create-report',
    component: CreateReportComponent,
  },
  //{
  //path: 'report',
  //component: ReportComponent
  //},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'report-list',
    component: ReportListComponent,
    canActivate: [AuthGuard], // Protect the route with the AuthGuard
  },
  {
    path: 'secret',
    component: SecretCowComponent,
  },

  { path: 'signUp', component: SignUpComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent },
]
