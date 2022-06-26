import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortingType } from 'src/app/enums/sortingType';
import { SortPredicate } from 'src/app/interfaces/sort-predicate';

@Component({
    selector: 'app-sort-button',
    templateUrl: './sort-button.component.html',
    styleUrls: ['./sort-button.component.css']
})
export class SortButtonComponent implements OnInit {

    @Input() labels : string[] = [ "Label" ];

    @Output() changeEvent = new EventEmitter<SortPredicate>();

    currentIndex = 0;
    sortingType = SortingType.None;

    changeLabel() {
        this.currentIndex = (this.currentIndex === this.labels.length - 1) ? 0 : (this.currentIndex + 1);
    }

    changeSortingType() {
        switch (this.sortingType) {
            case SortingType.None:
                this.sortingType = SortingType.Ascending;
                break;
            case SortingType.Ascending:
                this.sortingType = SortingType.Descending;
                break;
            case SortingType.Descending:
                this.sortingType = SortingType.None;
                break;
            default:
                this.sortingType = SortingType.None;
                break;
        }

        this.changeEvent.emit({ label: this.currentLabel(), sortingType: this.sortingType });
    }

    currentLabel() {
        return this.labels[this.currentIndex];
    }

    canDisplayOff() {
        return this.sortingType === SortingType.None;
    }

    canDisplayAsc() {
        return this.sortingType === SortingType.Ascending;
    }

    canDisplayDesc() {
        return this.sortingType === SortingType.Descending;
    }

    constructor() { }

    ngOnInit(): void { }

}
