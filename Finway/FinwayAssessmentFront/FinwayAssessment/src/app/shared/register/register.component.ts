import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  displayError:boolean;
  displaySuccess:boolean;

  constructor(private authService:AuthService){
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(8),
        ],
      ),
      email:new FormControl('', [Validators.required]),
    });
    this.displayError = false;
    this.displaySuccess = false;
  }
  onSubmit(){
    if (this.registerForm.valid) {
      console.log(this.registerForm.getRawValue());
      this.authService.register(this.registerForm.getRawValue())
      .subscribe({
        next:(res) => {
        console.log(res);
        this.displaySuccess = true;

      },
      error:(error) => {
        console.log(error);
        this.displayError = true;

        //this.router.navigate(['/persons']);
      }}
      
      );
    }
  }
}

