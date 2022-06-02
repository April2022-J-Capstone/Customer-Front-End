import { Injectable } from '@angular/core';
import { NewOrder } from '../interfaces/new-order';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

    order: NewOrder;

    constructor() {
        this.order = {
            subTotal: 0,
            deliveryFee: 0,
            tax: 0,
            total: 0,
            restaurantIds: [],
            items: []
        }
    }

    addRestaurant(id:Number) {
        if (this.order.restaurantIds.includes(id) == false) {
            this.order.restaurantIds.push(id);
            console.log("Added " + id + " to restaurant IDs");
        } else {
            console.log("Restaurant already present in order.");
        }
    }

    removeRestaurant(id:Number) {
        if (this.order.restaurantIds.includes(id) == true) {
            this.order.restaurantIds.splice(this.order.restaurantIds.indexOf(id), 1);
            console.log("Removed " + id + " from restaurant IDs");
        } else {
            console.log("No restaurant with id " + id + " present in order.");
        }
        
    }
}
