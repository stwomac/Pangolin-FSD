import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { LoginComponent } from './components/login/login.component'
import { Nav_BarComponent } from './components/nav_bar/nav_bar.component'
import { UserServices } from './services/users.service'
import { ReportServices } from './services/report.service'
import { ContextServices } from './services/context.service'
import { AnnotationServices } from './services/annoation.service'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    MatSlideToggleModule,
    LoginComponent,
    Nav_BarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend'

  constructor(
    userServices: UserServices,
    reportServices: ReportServices,
    contextServices: ContextServices,
    annotationServices: AnnotationServices,
  ) {
    // userServices.get(1).subscribe(console.log)
    userServices.getAll().subscribe(console.log)
    // userServices.create().subscribe(console.log)
    // userServices.update().subscribe(console.log)
    // userServices.delete().subscribe(console.log)

    // reportServices.get(1).subscribe(console.log)
    reportServices.getAll().subscribe(console.log)
    // reportServices.create().subscribe(console.log)
    // reportServices.update().subscribe(console.log)
    // reportServices.delete().subscribe(console.log)

    // contextServices.get(1).subscribe(console.log)
    contextServices.getAll().subscribe(console.log)
    // contextServices.create().subscribe(console.log)
    // contextServices.update().subscribe(console.log)
    // contextServices.delete().subscribe(console.log)

    // annotationServices.get(1).subscribe(console.log)
    annotationServices.getAll().subscribe(console.log)
    // annotationServices.create().subscribe(console.log)
    // annotationServices.update().subscribe(console.log)
    // annotationServices.delete().subscribe(console.log)
  }
}
