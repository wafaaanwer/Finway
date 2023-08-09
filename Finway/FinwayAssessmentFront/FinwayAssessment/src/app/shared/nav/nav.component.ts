import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  name:string;
  role:string;
  constructor(public authService: AuthService, private router: Router){
    this.name = authService.getName();
    this.role = authService.getRole();
  }
  loggedIn(){
    // this.isLoggedIn = true;
     return this.authService.loggedIn();
   }
   loggedOut(){
    // this.isLoggedIn = false;
     localStorage.removeItem('token');
    // this.alertifyService.message('Logged Out');
     this.router.navigate(['/']);
   }
}
