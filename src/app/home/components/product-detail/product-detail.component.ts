import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/core/models/cart';
import { Product } from 'src/app/core/models/product';
import { User } from 'src/app/core/models/users';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  cartItems: Cart[];
  user: User = JSON.parse(sessionStorage.getItem('user'));
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly tocart: CartService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data.product;
    });

    if (this.user !== null && this.user !== undefined){
      this.tocart.allCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
    this.setTitle('eKarting ' + this.product.productName);
  }
  toCartScreen(): void {
    if (this.user !== null){
      // validate if item is already in cart
    // if cart is empty
    if (this.cartItems.length === 0) {
         this.addToCart();
    }
    else {
      // filter out existing item if it matches this product
      const fetchedItem: Cart = this.cartItems.find(item => {
        return (item.product.id === this.product.id && item.user.id === this.user.id);
      });

      if (fetchedItem !== undefined && fetchedItem !== null ) {
        fetchedItem.quantity = (fetchedItem.quantity < fetchedItem.product.quantity)
                                ? Number(fetchedItem.quantity) + Number('1') :
                                fetchedItem.quantity;
        this.updateCart(fetchedItem);
      } else {
        this.addToCart();
      }
    }
    this.router.navigateByUrl('/quick-order');
    }else{
      this.router.navigateByUrl('/auth');
    }
  }


  addToCart(): void {
    this.tocart.addToCart(new Cart(this.product, this.user, 1, new Date())).subscribe(data => {
      console.log('Item Added to Cart !!', data);
    }, error => {
      console.log('Error while adding item to Cart', error);
    });
  }

  updateCart(cartItem): void {
    this.tocart.updateCartItem(cartItem).subscribe(data => {
      console.log('Item Quantity Updated in Cart !!', data);
    }, error => {
      console.log('Error while updating item in Cart', error);
    });
  }
  private setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  categoryRoute(): void{
    this.router.navigateByUrl('/shop?categoryName=' + this.product.category.categoryName);
  }
  subCategoryRoute(): void{
    this.router.navigateByUrl('/shop?categoryName=' + this.product.category.categoryName +
                                  '&subCategory=' + this.product.category.subCategory);
  }
}
