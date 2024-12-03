import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {UserServices} from '../services/user.service';
import { Router} from '@angular/router';
import {ErrorBlockComponent} from '../components/error-block/error-block.component';
import {User} from '../models/user';

@Component({
  selector: 'app-sign-up',
  imports: [MatInput,MatFormField,ReactiveFormsModule,MatLabel,ErrorBlockComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor (private userService : UserServices,private router : Router) {}

  txtEmail : FormControl = new FormControl('');
  txtPassword : FormControl = new FormControl('');

  error : string = "";

  trySignUp() {
    try {
      this.userService.trySignUp(this.txtEmail.value,this.txtPassword.value);
      this.router.navigate(['/login']);
    } catch(e) {
      console.log(e);
    }
  }

}
