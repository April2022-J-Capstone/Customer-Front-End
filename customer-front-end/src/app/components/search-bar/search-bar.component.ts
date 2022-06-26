import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    @Input() placeholder = "Search...";

    searchQuery = "";
    advancedPanelVisible = false;

    changeSearchQuery(event: Event) {
        const value = (event.target as HTMLInputElement).value
        if (value != null)
            this.searchQuery = value;
    }

    @Output() searchEvent = new EventEmitter<string>();

    search() {
        this.searchEvent.emit(this.searchQuery);
    }

    constructor() { }

    ngOnInit(): void { }

}
