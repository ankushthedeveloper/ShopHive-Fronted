import { CartItemType, ShippingInfo, User } from "./types";

export interface userReducerInitialState{
    user:User|null;
    loading:boolean;
}
export interface cartReducerInitialState{
    loading:boolean;
    cartItems:CartItemType[];
    subtotal:number;
    tax:number;
    shippingCharges:number;
    total:number;
    discount:number;
    shippingInfo:ShippingInfo;
}