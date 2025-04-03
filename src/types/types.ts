export type User = {
  name: string;
  photo: string;
  email: string;
  gender: string;
  gId: string;
  dob: string;
  role: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  photo: string;
  description: string;
  tags:string;
};
export type ProductRes = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  photos: [string];
  description: string;
  tags:[string];
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phone:string
};

export type CartItemType = {
  productId: string|undefined;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = Omit<CartItemType, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name:string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  Revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  OrderChangePercentage: number;
  ProductChangePercentage: number;
  RevenueChangePercentage: number;
  UserChangePercentage: number;
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  senior: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  categoryCount: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  RevenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    user: number;
  };
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};

export type Line = {
  product: number[];
  users: number[];
  discount: number[];
  revenue: number[];
};
