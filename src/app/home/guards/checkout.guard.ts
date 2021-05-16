import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private readonly router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (sessionStorage.getItem('isLoggedIn') !== 'true'){
        this.router.navigate(['/auth']);
        return false;
      }else if (sessionStorage.getItem('isLoggedIn') === 'true' && (sessionStorage.getItem('itemsInCart') === '0' || sessionStorage.getItem('itemsInCart') === null)){
        this.router.navigate(['/quick-order']);
        return false;
      }else{
        return true;
      }
    }
}
