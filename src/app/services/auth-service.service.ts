import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }


  public isAuthorized(): boolean {
    const token: any = localStorage.getItem('authorization');

    const decodeToken = this.jwtHelper.decodeToken(token);

    if (!decodeToken) {
      this.router.navigate(['/auth/login']);
    }

    localStorage.setItem('userDetails', JSON.stringify(decodeToken))
    return decodeToken
  }
}

