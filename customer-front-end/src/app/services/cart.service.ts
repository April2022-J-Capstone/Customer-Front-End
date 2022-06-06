import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cart: MenuItem[] = [];

    constructor() {

    }

    addItemToCart(item: MenuItem) {
        this.cart.push(item);
        console.log(this.cart);
    }

    removeFromCart(cartId: number) {
        this.cart.splice(cartId, 1)
        console.log(this.cart);
    }
}
