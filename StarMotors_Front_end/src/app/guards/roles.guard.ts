import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { EmpeladoControllerService } from 'app/Services/SQL/angular_api_client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private usuario :  EmpeladoControllerService, private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if (localStorage.getItem('idEmpleado') === null) {
        this.router.navigate([''])
          return false;
      } else {
        return true;
      }
    
  }
  
}
