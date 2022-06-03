import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.css']
})
export class MenuItemModalComponent implements OnInit {

    @Input()
    data!: MenuItem;
  
    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
    }

}
