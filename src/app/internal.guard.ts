import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let role;

    if (currentUser) {
      role = JSON.parse(atob(currentUser.token.split('.')[1])).userRole;

    }

    switch (route.routeConfig.path) {
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
