import { NewOrderItem } from "./new-order-item";

export interface NewOrder {
    restaurantNotes?: String;
    driverNotes?: String;
    subTotal: Number;
    deliveryFee: Number;
    tax: Number;
    tip?: Number;
    total: Number;
    netLoyalty?: Number;
    restaurantIds: Number[];
    discountIds?: Number[];
    items: NewOrderItem[];
}
