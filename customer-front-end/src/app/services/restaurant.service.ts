import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from 'src/environments/environment';

const SERVICE_PATH : String = "/restaurant-service";
const path = (p: String) => environment.basePath + SERVICE_PATH + p;

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(private httpClient: HttpClient) { }

    getAllRestaurants() {
        return this.httpClient.get<Restaurant[]>(path("/restaurants"));
    }

    searchRestaurants(query: string) {
      const params = new HttpParams().set('q', encodeURIComponent(query));
      return this.httpClient.get<Restaurant[]>(path("/restaurants/search"), { params });
    }
    
    getRestaurantMenu(restaurantId: String) {
        return this.httpClient.get<MenuItem[]>(path("/restaurant/" + restaurantId + "/menuItems"));
    }

    searchRestaurantMenu(restaurantId: String, query: string) {
      const params = new HttpParams().set('q', encodeURIComponent(query));
      return this.httpClient.get<MenuItem[]>(path("/restaurant/" + restaurantId + "/menuItems/search"), { params });
    }

}
