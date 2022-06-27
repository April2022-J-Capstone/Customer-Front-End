import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortingType } from 'src/app/enums/sortingType';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
    selector: 'app-restaurant-menu',
    templateUrl: './restaurant-menu.component.html',
    styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

    restaurantID!: string|null;
    menu: MenuItem[] = [];
    menuLoaded: boolean = false;

    sortLabels = [ "Price" ];
    sortMethod = { label: "", sortingType: SortingType.None };

    search(query: string) {
        if (this.restaurantID)
            this.restaurantService.searchRestaurantMenu(this.restaurantID, query, this.sortMethod)
                .subscribe((data) => this.displayMenuItems(data));
    }

    displayMenuItems(data: MenuItem[]) {
        if (data) {
            this.menuLoaded = true;
            this.menu = [...data]
        }
    }

    constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.restaurantID = params.get("restaurantId");
            this.menuLoaded = false;
            if (this.restaurantID) {
                this.restaurantService.getRestaurantMenu(this.restaurantID).subscribe((data) => this.displayMenuItems(data));
            } else {
                console.error("RestaurantMenuComponent: did not retrieve a restaurant ID");
            }
        });
    }

}
