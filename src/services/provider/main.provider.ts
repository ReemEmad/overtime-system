import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export const mainProvider = createApi({
  reducerPath: "mainProvider",
  baseQuery: baseQuery,
  tagTypes: ["users", "jobs", "skills", "squadLeads", "constants"],
  endpoints: () => ({}),
});
