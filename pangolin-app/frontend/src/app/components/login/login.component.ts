import { NgIf } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UserServices } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, NgIf, MatButtonModule, MatFormFieldModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {

  constructor(private userService : UserServices) {
    this.token = "placeholder";
  }

  token : string;

  txtUsername : FormControl = new FormControl('');
  txtPassword : FormControl = new FormControl('');
  btnLogin : FormControl = new FormControl('');

  tryLogin(): void {
    this.userService.tryLogin(this.txtUsername.value, this.txtPassword.value);
  }
}
