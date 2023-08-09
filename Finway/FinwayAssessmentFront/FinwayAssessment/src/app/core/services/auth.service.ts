import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/auth/register.model';
import { LoginModel } from '../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken:any;
  tokenScheme = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
  constructor(private http: HttpClient) {}
  Login(login:LoginModel) {
    return this.http.post(this.baseUrl + 'login', login).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
          this.getName();
          this.getRole();
        }

      })
    );
  }
  register(register: RegisterModel){
    return this.http.post(this.baseUrl + 'register', register);
  }
  loggedIn(){
    const token = localStorage.getItem('token');
    if(token == ""){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  public getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }
  getName(){
    const token = localStorage.getItem('token');
    console.log("get name");
    console.log( this.getClaim(token!, this.tokenScheme+'name'));
    return  this.getClaim(token!, 'name');
  }
  getRole(){
    const token = localStorage.getItem('token');
    console.log("get role");
    console.log( this.getClaim(token!, 'role'));
    return  this.getClaim(token!, this.tokenScheme+'role');
  }
}
