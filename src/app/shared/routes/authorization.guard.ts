import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, ActivatedRoute,Router,CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService  } from '../../services/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authorizationService: AuthServiceService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized();



    if (!isAuthorized) {
     this.router.navigate(['/auth/login']);
  }
    return true;
  }

  
}
