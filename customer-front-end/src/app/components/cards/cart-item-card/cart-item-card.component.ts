import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {

    @Input()
    data!: MenuItem
    @Input()
    cartID!: number;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
    }

    removeFromCart() {
        this.cartService.removeFromCart(this.cartID);
    }

}
