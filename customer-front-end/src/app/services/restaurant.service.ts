import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item';
import { Restaurant } from '../interfaces/restaurant';
import { environment } from 'src/environments/environment';
import { SortingType } from '../enums/sortingType';
import { SortPredicate } from '../interfaces/sort-predicate';

const SERVICE_PATH : string = "/restaurant-service";
const path = (p: string) => environment.basePath + SERVICE_PATH + p;
const sortParam = (v: SortPredicate) : string => {
    const label = v.label.toLowerCase();
    let method = "";
    switch (v.sortingType) {
      case SortingType.Ascending:
        method = 'a';
        break;
      case SortingType.Descending:
        method = 'd';
        break;
    }
    
    if (!label || !method)
        return "";
    
    return `${label}.${method}`
}

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    constructor(private httpClient: HttpClient) { }

    getAllRestaurants() {
        return this.httpClient.get<Restaurant[]>(path("/restaurants"));
    }

    searchRestaurants(query: string, sortMethod: SortPredicate) {
        const sort = sortParam(sortMethod);

        let params = new HttpParams().set('q', encodeURIComponent(query));
        if (sort) params = params.set('sort', sort);

        return this.httpClient.get<Restaurant[]>(path("/restaurants/search"), { params });
    }
    
    getRestaurantMenu(restaurantId: String) {
        return this.httpClient.get<MenuItem[]>(path("/restaurant/" + restaurantId + "/menuItems"));
    }

    searchRestaurantMenu(restaurantId: String, query: string, sortMethod: SortPredicate) {
      const sort = sortParam(sortMethod);

      let params = new HttpParams().set('q', encodeURIComponent(query));
      if (sort) params = params.set('sort', sort);

      return this.httpClient.get<MenuItem[]>(path("/restaurant/" + restaurantId + "/menuItems/search"), { params });
    }

}
