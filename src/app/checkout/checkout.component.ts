import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { ProductService } from '../core/services/product.service';
import { StatesService } from '../core/services/states.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  states;
  orderPlaced = false;
  constructor(private formBuilder: FormBuilder, private readonly stateService: StatesService,
              private readonly cartService: CartService, private readonly productService: ProductService,
              private titleService: Title, private readonly route: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[1-9][0-9]{5}$')]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]{10}')]]
    });

    this.stateService.fetchAllStates().subscribe(data => {
      this.states = data;
    }, error => {
      console.log(error);
    });
    this.titleService.setTitle('e-Kart Checkout');
  }

  placeOrder(): void {
    this.cartService.getCartItemsByUserId(sessionStorage.getItem('user.id')).subscribe(cartItems => {
      cartItems.forEach(cartItem => {
        if (cartItem.quantity <= cartItem.product.quantity) {
          const product = cartItem.product;
          product.quantity -= cartItem.quantity;
          this.cartService.removeItemFromCart(cartItem.id).subscribe(data => {
          });
          this.productService.updateProduct(product).subscribe(data => {
            this.orderPlaced = true;
          });
        }
      });
    });
  }

  continueEkarting(): void{
    this.route.navigateByUrl('');
    this.titleService.setTitle('Online eKarting platform for various sports, fitness equipments');
  }
}
