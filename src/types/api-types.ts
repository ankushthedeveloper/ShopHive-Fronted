import { Bar, CartItemType, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type filteredProductsReq = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type newProductRequst = {
  id: string;
  formData: FormData;
};

export type singleProductRes = {
  success: boolean;
  data: Product;
};

export type updateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type deleteProductRequest = {
  userId: string;
  productId: string;
};

export type OrderApiRequest = {
  loading?: boolean;
  orderItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  total: number;
  discount: number;
  shippingInfo: ShippingInfo;
  user: string;
};

export type updateOrderReq={
  userId:string;
  orderId:string;
}

export type deleteUserReq={
  userId:string;
  adminId:string;
}


export type allOrderResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderResponse = {
  success: boolean;
  order: Order;
};

export type messageTypeResponse = {
  success: boolean;
  message: string;
};
export type userResponse = {
  success: boolean;
  user: User;
};

export type allProductResponse = {
  success: boolean;
  data: Product[];
};

export type categoriesResponse = {
  success: boolean;
  data: string[];
};

export type filterdProductsResponse = allProductResponse & {
  totalPage: number;
};

export type allUsersResponse ={
  success: boolean;
  data: User[];

}

export type statsResponse ={
  success: boolean;
  stats: Stats
}

export type pieResponse ={
  success: boolean;
  pieCharts: Pie

}

export type barResponse ={
  success: boolean;
  barCharts: Bar;

}


export type LineResponse ={
  success: boolean;
  LineCharts: Line;

}


export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItemType[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};

// export type AllDiscountResponse = {
//   success: boolean;
//   coupons: CouponType[];
// };

// export type SingleDiscountResponse = {
//   success: boolean;
//   coupon: CouponType;
// };