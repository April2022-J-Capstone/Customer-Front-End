import { Component, OnInit } from '@angular/core';
import { SortingType } from 'src/app/enums/sortingType';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
    selector: 'app-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
    
    restaurants!: Restaurant[];
    restaurantsLoaded: boolean = false;

    sortLabels = [ "Rating", "Distance" ];
    sortMethod = { label: "", sortingType: SortingType.None };

    search(query: string) {
        this.restaurantService.searchRestaurants(query, this.sortMethod)
            .subscribe((data) => this.displayRestaurants(data));
    }

    displayRestaurants(data: Restaurant[]) {
        this.restaurantsLoaded = false;
        if (data) {
            this.restaurantsLoaded = true;
            this.restaurants = [...data]
        }
    }

    constructor(private restaurantService: RestaurantService) { }

    ngOnInit(): void {
        this.restaurantService.getAllRestaurants().subscribe((data) => this.displayRestaurants(data));
    }

}
