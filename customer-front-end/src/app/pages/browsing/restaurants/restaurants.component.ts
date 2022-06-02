import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/restaurant';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
    
    allRestaurants: Restaurant[] = [
        {
            restaurantId: 1,
            location_id: 1,
            owner_id: 1,
            name: "Testeraunt",
            location_name: "Test Location",
            address: "123 Test Lane",
            city: "Testville",
            state: "NY",
            zip_code: 12345,
            owner_name: "Owner",
            restaurantTags: ["Americana", "$$"]
        },
        {
            restaurantId: 2,
            location_id: 1,
            owner_id: 2,
            name: "Testeraunt2",
            location_name: "Test Location",
            address: "123 Test Lane",
            city: "Testville",
            state: "NY",
            zip_code: 12345,
            owner_name: "Owner2",
            restaurantTags: ["Americana", "$$"]
        },
        {
            restaurantId: 3,
            location_id: 1,
            owner_id: 3,
            name: "Testeraunt3",
            location_name: "Test Location",
            address: "123 Test Lane",
            city: "Testville",
            state: "NY",
            zip_code: 12345,
            owner_name: "Owner3",
            restaurantTags: ["Americana", "$$"]
        }
    ];


    constructor() { }

    ngOnInit(): void {
    }

}
