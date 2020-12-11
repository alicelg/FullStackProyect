import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InternalGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermission(route);
  }

  private checkPermission<Boolean>(route: ActivatedRouteSnapshot): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    let role;

    console.log(route.routeConfig.path);
    if (currentUser) {

      role = JSON.parse(atob(currentUser.token.split('.')[1])).userRole;

    }


    switch (route.routeConfig.path) {

      case 'login':
      case 'signup':
        if (role === 'user') {
          this.router.navigate(['/usuario', currentUser.id]);
          return false;
        } else {
          return true;
        }
        break;

      case 'test/:id':
      case 'test/:id/resultado':
        if (role === 'user') {
          return true;

        } else {
          this.router.navigate(['/tests', currentUser.id]);
          return false;
        }
        break;

      default:
        if (role === 'user') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
    }
  }

}
