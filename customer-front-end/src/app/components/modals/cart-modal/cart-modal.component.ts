import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})
export class CartModalComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal, public cartService: CartService) { }

    ngOnInit(): void {
        
    }

    checkout() {

    }

}
