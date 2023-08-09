import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    token: any;
    constructor(private authService:AuthService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.token = this.authService.getToken();
      const requestWithAuth = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token
        }
      });
      return next.handle(requestWithAuth);
    }
  }
  