import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private injector:Injector) { }

    intercept(req,next){
      let authService = this.injector.get(AuthService)
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization:`Bearer ${authService.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }
  }