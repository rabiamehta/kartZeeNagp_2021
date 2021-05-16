import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartUrl = environment.server_url + '/cart';
  constructor(private readonly apiService: ApiService) { }

  subjectObserver = new BehaviorSubject('0');
  public itemsPriceObservabl = this.subjectObserver.asObservable();

  allCartItems(): Observable<Cart[]> {
    return this.apiService.get(this.cartUrl);
  }

  getCartItemByProductIdAndUserId(productId, userId): Observable<Cart[]>{
    return this.apiService.get(this.cartUrl + '?productId=' + productId + '&userId=' + userId);
  }

  getCartItemsByUserId(userId): Observable<Cart[]>{
    return this.apiService.get(this.cartUrl + '?userId=' + userId);
  }

  addToCart(cartObject: Cart): Observable<Cart>{
    return this.apiService.post(this.cartUrl, cartObject);
  }

  updateCartItem(cartItem: Cart): Observable<Cart>{
    return this.apiService.put(this.cartUrl + '/' + cartItem.id, cartItem);
  }

  removeItemFromCart(itemId: number): Observable<Cart>{
    return this.apiService.delete(this.cartUrl + '/' + itemId);
  }
}
