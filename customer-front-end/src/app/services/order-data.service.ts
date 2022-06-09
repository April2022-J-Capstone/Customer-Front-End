import { Injectable } from '@angular/core';
import { NewOrder } from '../interfaces/new-order';
import { CartService } from './cart.service';
import { cloneDeep } from 'lodash';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

    order: NewOrder;
    orderSuccessful: boolean = false;

    constructor(private cartService: CartService, private httpClient: HttpClient, private router: Router, private datePipe: DatePipe) {
        this.order = {
            subTotal: 0,
            deliveryFee: 0,
            tax: 0,
            total: 0,
            restaurantIds: [],
            items: []
        }
    }

    addRestaurant(restaurantId:number) {
        if (this.order.restaurantIds.includes(restaurantId) == false) {
            this.order.restaurantIds.push(restaurantId);
            console.log("Added " + restaurantId + " to restaurant IDs");
        } else {
            console.log("Restaurant already present in order.");
        }
    }

    removeRestaurant(restaurantId:number) {
        if (this.order.restaurantIds.includes(restaurantId) == true) {
            this.order.restaurantIds.splice(this.order.restaurantIds.indexOf(restaurantId), 1);
            console.log("Removed " + restaurantId + " from restaurant IDs");
        } else {
            console.log("No restaurant with id " + restaurantId + " present in order.");
        }
    }

    removeItemFromOrder(id:number) {
        this.cartService.removeFromCart(id);
        this.setupOrder();
    }

    setupOrder() {
        // Add items from cart
        // Not sure if we want to do it this way, or allow it to be copied by reference.
        //this.order.items = cloneDeep(this.cartService.cart);
        this.order.items = [...this.cartService.cart];
        console.log(this.order.items);

        // Calculate subTotal
        let subTotal: number = 0;
        this.order.items.forEach(function (item) {
            subTotal = subTotal + item.price;
        });
        this.order.subTotal = subTotal;

        // Temporary code until payment integration is implemented
        this.order.tax = this.order.subTotal * 0.07;

        this.order.total = this.order.subTotal + this.order.tax;

    }

    placeOrder() {
        const dateString = this.datePipe.transform(Date.now(), "YYYY-MM-dd hh:mm:ss");
        console.log(dateString);
        if (dateString) {
            this.order.timeCreated = new Date(dateString);
        }
        
        this.httpClient.post<NewOrder>(environment.basePath + "/order-service/" + 17 + "/order", this.order, {observe: "response"})
        .subscribe({
            next: (response) => {
                if (response.ok) {
                    this.orderSuccessful = true;
                }
                this.router.navigate(["../checkout/order-confirmation"]);
            },
            error: (error: HttpErrorResponse) => {
                console.log(error.message);
                this.router.navigate(["../checkout/order-confirmation"]);
            }
        });
        this.cartService.clearCart();
        this.setupOrder();
    }
}
