import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const user = localStorage.getItem('userDetails');
    const path: string = route.url[0]?.path;

    if (path === undefined || path === 'signup') {
      if (user) {
        this.router.navigate(['/home']);
        return false;
      } else {
        
        return true;
      }
    } else {
      if (user) {
        if (JSON.parse(user).accessToken) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
