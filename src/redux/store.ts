import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/ProductAPI";
import { cartReducer } from "./reducer/cartReducer";
import { OrderApi } from "./api/OrderAPI";
import { dashboardApi } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },

  // middleware:(mid)=>[...mid(),userAPI.middleware

  //,productAPI.middleware
  // ]

  middleware: (mid) =>
    mid().concat([
      userAPI.middleware,
      productAPI.middleware,
      OrderApi.middleware,
      dashboardApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
