import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './Services/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }

  constructor(
    private Token:TokenService,
    private router:Router
  ){}

  canActivate():any {
    if(this.Token.loggedIn()){
      return true;
     }else{
       this.router.navigate(['/login']);
       return false;

     }

  }
}
