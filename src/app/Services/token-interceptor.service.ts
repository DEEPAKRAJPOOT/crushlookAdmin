import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector : Injector) { }

  intercept(req, next)
  {
    let tokenService = this.injector.get(TokenService); 
      let tokenizedReq = req.clone({
         setHeaders : {
            Authorization : `Bearer ${tokenService.get()}`
         }
      })
      return next.handle(tokenizedReq);
  }
}
