import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // baseUrl: "https://63d996fbb28a3148f67605ca.mockapi.io/api/v1/",
});

export const mainProvider = createApi({
  reducerPath: "mainProvider",
  baseQuery: baseQuery,
  tagTypes: ["users", "jobs"],
  endpoints: () => ({}),
});
