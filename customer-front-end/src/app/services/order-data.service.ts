import { Injectable } from '@angular/core';
import { NewOrder } from '../interfaces/new-order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

    order: NewOrder;

    constructor(private cartService: CartService) {
        this.order = {
            subTotal: 0,
            deliveryFee: 0,
            tax: 0,
            total: 0,
            restaurantIds: [],
            items: []
        }
    }

    addRestaurant(restaurantId:Number) {
        if (this.order.restaurantIds.includes(restaurantId) == false) {
            this.order.restaurantIds.push(restaurantId);
            console.log("Added " + restaurantId + " to restaurant IDs");
        } else {
            console.log("Restaurant already present in order.");
        }
    }

    removeRestaurant(restaurantId:Number) {
        if (this.order.restaurantIds.includes(restaurantId) == true) {
            this.order.restaurantIds.splice(this.order.restaurantIds.indexOf(restaurantId), 1);
            console.log("Removed " + restaurantId + " from restaurant IDs");
        } else {
            console.log("No restaurant with id " + restaurantId + " present in order.");
        }
    }

    addItemsFromCart() {
        this.order.items = [...this.cartService.cart];
        console.log("Added items from cart to order.");
        console.log(this.order.items);
    }

    removeItemFromOrder(id:Number) {
        this.order.items.splice(id.valueOf(), 1);
    }
}
