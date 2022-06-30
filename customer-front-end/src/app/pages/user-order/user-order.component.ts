import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDataService } from 'src/app/services/order-data.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { OrderItem } from 'src/app/interfaces/order-item';
import { UserOrder } from 'src/app/interfaces/user-order';
import { NewOrder } from 'src/app/interfaces/new-order';
import { NewOrderItem } from 'src/app/interfaces/new-order-item';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  orderID!: string|null;
  userID!: any;


  // boolean for editing phases
  addingItem: boolean = false;
  cancelling: boolean = false;
  editing: boolean = false;

  // boolean for if data for model was loaded
  orderLoaded: boolean = false;
  allMenuItemsLoaded: boolean = false;
  restaurantsLoaded: boolean = false;
  restaurantMenuLoaded: boolean = false;


  updateTip!: number|0;



  order!: UserOrder;
  orderItems: OrderItem[] = [];
  editedOrder: NewOrder;
  editedOrderItem!: NewOrderItem;


  restaurantID!:  any|null;
  allRestaurants!: Restaurant[];
  allMenuItems: MenuItem[] = [];
  restaurantCount!: number| 0;
  restaurant: string = "default";
  restaurantMenu: MenuItem[] = [];
  addedMenuItem!: OrderItem|{};


  constructor(private orderDataService: OrderDataService, private restaurantService: RestaurantService, private route: ActivatedRoute) { 
    this.editedOrder = {
      subTotal: 0,
      deliveryFee: 0,
      tax: 0,
      total: 0,
      tip: 0,
      restaurantIds: [],
      items:[]
    },
    this.editedOrderItem = {
      menuItemId: 0,
      price : 0
    }
  }



  ngOnInit(): void {
    // createUserOrder data on load
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get("orderId");
      this.userID = params.get("userId");
      this.orderLoaded = false;
      if(this.orderID){
        this.orderDataService.getSelectedOrder(this.userID , this.orderID).subscribe((data: UserOrder) => {
          if(data){
            this.orderLoaded = true;
            for(let i = 0; i < data.items.length; i++){
                // console.log('looping through orderItems for enabled')
                if(data.items[i].enabled == false){
                  // console.log('item enabled is false ' + data.items[i])
                } else {
                  // console.log('pushing item');
                  this.orderItems.push(data.items[i]);
                }
              }
            this.order = data;
            // console.log('order.items: ', this.order.items.forEach(function(item){console.log(`order.item: ${item.name}`)}));
            // console.log('orderItems: ', this.orderItems.forEach(function(item){console.log(`orderItem: ${item.name}`)}));
            this.order.items = this.orderItems;
          } 
        })
      }
    })
  }

  loadEditPage(){
    this.editing = true;

    
    this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
      if(data){
          this.allRestaurants = [...data];
      }
    });
  }


  removeItem(itemIndex: number){
    this.orderItems.splice(itemIndex, 1);
    if(this.allMenuItemsLoaded == false){
      this.loadAllMenuItems();
    }
  }

  loadAddItem(){
    this.addingItem = true;
    console.log("addItem button clicked");
    if(this.allMenuItemsLoaded == false){
      this.loadAllMenuItems();
    }

  }

  addItem(itemIndex: number){
    this.orderItems[this.orderItems.length] = {
      "id": 0,
      "name": this.restaurantMenu[itemIndex].name,
      "description": "",
      "enabled": true,
      "menuItemId": this.restaurantMenu[itemIndex].itemId,
      "price": this.restaurantMenu[itemIndex].price,
    }
  }

  loadAllMenuItems(){
    this.allMenuItemsLoaded = true;
    console.log('loading menuItems')
    for(let i = 0; i < 4; i++){
      console.log('inside for loop');
      this.restaurantID = this.allRestaurants[i].restaurantId;
      console.log('running getRestaurantMenu');
      this.restaurantService.getRestaurantMenu(this.restaurantID).subscribe((data: MenuItem[]) => {
          if(data) {
            console.log('menu being loaded');
              console.log('data: ', data);
              for(let item of data){
                this.allMenuItems.push(item);
              }
          } else {
            console.log('no menu items loaded');
          }       
      });
    }
    console.log('finished loading menu items');
  }

  loadRestaurantMenu(restaurant: string){
    this.restaurantMenu = [];

    for(let i = 0; i < this.allMenuItems.length; i++){
      if(this.allMenuItems[i].restaurant_name == restaurant){
        this.restaurantMenu.push(this.allMenuItems[i]);
      }
    }
    this.restaurantMenuLoaded = true;
  }

  matchMenuItemToOrderItem(){
    // this.orderItems.forEach
    for(let i = 0; i < this.orderItems.length; i++){
      this.editedOrderItem.menuItemId = 0;
      for(let x = 0; x < this.allMenuItems.length; x++){
        if(this.allMenuItems[x].name == this.orderItems[i].name){
          this.editedOrder.items.push({menuItemId: this.allMenuItems[x].itemId, price: this.allMenuItems[x].price});
        }
      }
    }
  }

  sendEdit(){
    console.log("send edit button clicked");
    
    if(this.order.tip == null){
      this.order.tip = 0;
    }
    if(this.updateTip == null){
      this.updateTip = 0;
    }

    if(this.order.tip < this.updateTip){
      console.log("tip was increased");
    } else {
      console.log("tip was decreased")
    }



    this.order.total = this.order.total - this.order.tip;
    this.order.tip = this.updateTip;
    this.order.total = this.order.total + this.order.tip;


    // set up order as neworder 
    this.editedOrder.subTotal = this.order.subTotal;
    this.editedOrder.tip = this.order.tip;
    this.editedOrder.deliveryFee = this.order.deliveryFee;
    this.editedOrder.tax = this.order.tax;
    this.editedOrder.total = this.order.total;



    this.matchMenuItemToOrderItem();

    
    for(let item of this.editedOrder.items){
      console.log('items to be sent for update', item);
    }
    
    console.log('sending to update: ', this.editedOrder);

    this.orderDataService.updateOrder(this.userID, this.order.orderId, this.editedOrder);
  }
  
  cancelEdit(){
    this.editing = false;
    this.addingItem = false;
    console.log("cancel edit button clicked");
    location.reload();
  }

  cancelOrder(){
    console.log("cancel order button clicked");
    this.orderDataService.cancelOrder(this.userID, this.order.orderId);
  }

}
