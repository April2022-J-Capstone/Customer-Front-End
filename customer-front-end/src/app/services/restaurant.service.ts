import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getAllRestaurants() {
    return this.httpClient.get<Restaurant[]>("http://localhost:8080/restaurant-service/restaurants");
  }
  
  getRestaurantMenu(restaurantId: String) {
    return this.httpClient.get<MenuItem[]>("http://localhost:8080/restaurant-service/restaurant/" + restaurantId + "/menuItems");
  }
}
