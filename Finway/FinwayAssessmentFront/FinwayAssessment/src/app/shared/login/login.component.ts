import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  displayError:boolean;
  displaySuccess:boolean;

  constructor(private authService:AuthService, private router:Router){
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(8),
        ],
      )
    });
    this.displayError = false;
    this.displaySuccess = false;
  }
  onSubmit(){
    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.getRawValue())
      .subscribe({
        next:(res) => {
        console.log(res);
        this.displaySuccess = true;
        this.router.navigate(['/persons']);

      },
      error:(error) => {
        console.log(error);
        this.displayError = true;

        //this.router.navigate(['/persons']);
      }});
    }
  }
}
