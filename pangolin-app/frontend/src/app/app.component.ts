import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { LoginComponent } from './components/login/login.component'
import { Nav_BarComponent } from './components/nav_bar/nav_bar.component'

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

  constructor() {}
}
