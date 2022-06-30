import { Component, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/interfaces/user-order';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

    allOrders!: UserOrder[];
    ordersLoaded: boolean = false;
    emptyData: boolean = false;
    userID!: any|'1';

  constructor(private orderService: OrderDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    console.log(`Getting users orders.`)
    this.userID = params.get("userId");
    console.log(`userID from route ${this.userID}`);
    this.orderService.getUserOrders(this.userID).subscribe((data: UserOrder[]) => {
      this.ordersLoaded = false;
      if(data.length > 0) {
        console.log(`data: ${data}`);
        for(let x of data){
          console.log('x: ' + x.orderId);
        }
          this.ordersLoaded = true;
          this.allOrders = [...data]
      } else {
        this.ordersLoaded = true;
        this.emptyData = true;
      }
    });
    console.log(`all orders: ${this.allOrders}`);
  });
  }
}
