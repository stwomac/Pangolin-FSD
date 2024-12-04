import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { UserServices } from '../services/user.service'
import { Router } from '@angular/router'
import { ErrorBlockComponent } from '../components/error-block/error-block.component'
import { User } from '../models/user'

@Component({
  selector: 'app-sign-up',
  imports: [
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    ErrorBlockComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private userService: UserServices,
    private router: Router,
  ) {}

  txtEmail: FormControl = new FormControl('')
  txtPassword: FormControl = new FormControl('')

  error: string = ''

  trySignUp() {
    try {
      this.userService
        .trySignUp(this.txtEmail.value, this.txtPassword.value)
        .subscribe(
          (data) => {
            console.log(data)
            this.router.navigate(['/login'])
          },
          (error) => {
            if (Array.isArray(error.error.message)) {
              for (let value of error.error.message)
                this.error += String(value) + '\n'
            } else if (error.error.message) {
              //TODO: this might POTENTIALLY be another server error, more checking should be done here
              this.error = String(error.error.message)
            } else {
              this.error = 'unkown server error has occured'
            }
          },
        )
    } catch (e) {
      console.log(e)
    }
  }
}
