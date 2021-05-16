import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Cart[]> {
  constructor(private readonly cartService: CartService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart[]> {
    return this.cartService.allCartItems();
  }
}
