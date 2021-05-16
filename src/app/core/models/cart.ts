import { Product } from './product';
import { User } from './users';

export class Cart{
    product: Product;
    user: User;
    quantity: number;
    id: number;
    orderPlacedOn: Date;

    constructor(product, user, quantity, orderPlacedOn){
        this.product = product;
        this.user = user;
        this.quantity = quantity;
        this.orderPlacedOn = orderPlacedOn;
    }
}
