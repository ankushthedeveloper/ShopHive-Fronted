import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allUsersResponse, deleteUserReq, messageTypeResponse, userResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";
//${import.meta.env.VITE_SERVER}
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes:["users"],
  endpoints: (builder) => ({
    signup:builder.mutation<messageTypeResponse,User>({
      query:(user)=>({
        url:"",
        method: "POST",
        body: user,
      })
    }),
    login: builder.mutation<messageTypeResponse, User>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"]
    }),

    deleteUser:builder.mutation<messageTypeResponse, deleteUserReq>({
      query: ({userId,adminId}) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"]
    })
,    allusers: builder.query<allUsersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"]
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );     
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useSignupMutation,useLoginMutation,useAllusersQuery,useDeleteUserMutation } = userAPI;
