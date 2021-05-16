import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {

  cartArr: Cart[] = [];
  notInStockAlert: boolean;
  totalCartPrice = 0;
  $routeDataSubscription: Subscription;
  $cartServiceSubscription: Subscription;
  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly cartService: CartService,
              private titleService: Title) { }

  ngOnDestroy(): void {
    this.$routeDataSubscription.unsubscribe();
    this.$cartServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.$routeDataSubscription = this.route.data.subscribe(data => {
      this.cartArr = data.cartList;
      sessionStorage.setItem('itemsInCart', this.cartArr.length.toString());
    });

    this.updateTotalPrice();
    this.titleService.setTitle('e-Kart Shopping Bag');
  }


  goCheckout(): void {
    this.router.navigateByUrl('checkout');
  }

  updateItemQuantity(event, item: Cart): void {
    // update the cart item;s quantity
    if (event.target.value <= item.product.quantity) {
      this.notInStockAlert = false;
      this.totalCartPrice -= (Number(item.quantity) * Number(item.product.mrp));
      item.quantity = event.target.value;
      this.$cartServiceSubscription = this.cartService.updateCartItem(item).subscribe(data => {
        this.totalCartPrice += (Number(item.quantity) * Number(item.product.mrp));
      }, error => {
        console.log('Error while updating the item\'s quantity in cart', error);
      });
    } else {
      this.notInStockAlert = true;
    }
  }

  removeItemFromCart(item: Cart): void {
    this.$cartServiceSubscription = this.cartService.removeItemFromCart(item.id).subscribe(val => {
      this.cartService.allCartItems().subscribe(data => {
        this.cartArr = data;
        sessionStorage.setItem('itemsInCart', this.cartArr.length.toString());
      });
      this.totalCartPrice -= (Number(item.quantity) * Number(item.product.mrp));
    }, error => {
      console.log('Error deleting item from cart', error);
    });
  }

  updateTotalPrice(): void {
    this.$cartServiceSubscription = this.cartService.allCartItems().subscribe(items => items.forEach(item => {
      this.totalCartPrice += (item.quantity * item.product.mrp);
    }));
  }

  cancelQuantityUpdate(): void {
    this.$cartServiceSubscription = this.cartService.allCartItems().subscribe(data => {
      this.cartArr = data;
      this.notInStockAlert = false;
    });
  }
  navigate(): void {
    this.router.navigateByUrl('');
    this.titleService.setTitle('Online eKarting platform for various sports, fitness equipments');
  }
}
