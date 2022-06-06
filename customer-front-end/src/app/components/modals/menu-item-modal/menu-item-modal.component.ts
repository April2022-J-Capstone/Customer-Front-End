import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css']
})
export class MenuItemModalComponent implements OnInit {

    @Input()
    data!: MenuItem;
  
    constructor(public activeModal: NgbActiveModal, private cartService: CartService) { }

    ngOnInit(): void {
    }

    addToCart() {
        this.cartService.addItemToCart(this.data);
        this.activeModal.close("Cart click");
    }

}
