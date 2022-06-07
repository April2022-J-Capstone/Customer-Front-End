export interface CartItem {
    /* NEW ORDER ITEM FIELDS */
    menuItemId: Number;
    notes?: String;
    discount?: Number;
    price: Number;
    discountIDs?: Number[];
    /* MENU ITEM FIELDS */
    description: String;
    image_url: String;
}
