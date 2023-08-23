import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isLogged = localStorage.getItem('isAdminLogged')
      const path:string = route.url[0]?.path
      if(path === undefined){
        if (isLogged) {
          this.router.navigate(['/admin/users'])
          return false;
        } else {
          return true;
        }
      }else{
        if(isLogged){
          return true
        }else{
          this.router.navigate(['/admin'])
          return false
        }
      }
      
  }
}
