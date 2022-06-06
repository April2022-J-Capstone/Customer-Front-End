import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
    
    allRestaurants!: Restaurant[];
    restaurantsLoaded: boolean = false;

    constructor(private restaurantService: RestaurantService) { }

    ngOnInit(): void {
        this.restaurantService.getAllRestaurants().subscribe((data: Restaurant[]) => {
            this.restaurantsLoaded = false;
            if(data) {
                this.restaurantsLoaded = true;
                this.allRestaurants = [...data]
            }
        });
    }

}
