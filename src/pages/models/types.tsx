export type OrderItemType={
    name: string,
    photo: string,
    price: number,
    quantity: number,
    _id: string
    }
    
    
    export type OrderType={
        name: string,
        address: string,
        city: string,
        country: string,
        state: string,
        pincode: number,
        quantity?: number,
        status:"Processing"|"Shipped"|"Delivered",
        subtotal: number,
        shippingCharges: number,
        discount: number,
        tax: number,
        total: number,
        OrderItems:OrderItemType[],
        _id: string
        }