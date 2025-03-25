import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  categoriesResponse,
  deleteProductRequest,
  filterdProductsResponse,
  filteredProductsReq,
  messageTypeResponse,
  newProductRequst,
  allProductResponse,
  singleProductRes,
  updateProductRequest,
} from "../../types/api-types";

//${import.meta.env.VITE_SERVER}
export const productAPI = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<allProductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),    
    trendingProducts: builder.query<allProductResponse, string>({
      query: () => "trending",
      providesTags: ["product"],
    }),

    allProducts: builder.query<allProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),

    categories: builder.query<categoriesResponse, string>({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    filteredProducts: builder.query<
      filterdProductsResponse,
      filteredProductsReq
    >({
      query: ({ price, sort, page, category, search }) => {
        let base = `search?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) {
          base += `&sort=${sort}`;
        }
        if (category) {
          base += `&category=${category}`;
        }
        return base;
      },
    }),

    singleProduct: builder.query<singleProductRes, string>({
      query: (id) => `${id}`,
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<messageTypeResponse, newProductRequst>({
      query: ({ id, formData }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<messageTypeResponse, updateProductRequest>({
      query: ({ userId, productId, formData }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<messageTypeResponse, deleteProductRequest>({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useFilteredProductsQuery,
  useNewProductMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useTrendingProductsQuery
} = productAPI;
