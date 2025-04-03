import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  OrderApiRequest,
  OrderResponse,
  allOrderResponse,
  messageTypeResponse,
  updateOrderReq,
} from "../../types/api-types";

export const OrderApi = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<messageTypeResponse, OrderApiRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),    
      invalidatesTags: ["orders"],
    }),

    updateOrder: builder.mutation<messageTypeResponse, updateOrderReq>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),

    deleteOrder: builder.mutation<messageTypeResponse, updateOrderReq>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),

    myOrder: builder.query<allOrderResponse, string>({
      query: (id) => `myOrder?id=${id}`,
      providesTags: ["orders"],
    }),

    allOrder: builder.query<allOrderResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),

    orderDetails: builder.query<OrderResponse, string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrderQuery,
  useAllOrderQuery,
  useOrderDetailsQuery,

} = OrderApi;
