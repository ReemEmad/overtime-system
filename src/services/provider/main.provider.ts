import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useAuthToken from "../../hooks/useAuthToken";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    if (localStorage.getItem("userData")) {
      const user = JSON.parse(localStorage.getItem("userData") ?? "");
      if (user.access_token) {
        headers.set("Authorization", `Bearer ${user.access_token}`);
      }
    }
    return headers;
  },
});

export const mainProvider = createApi({
  reducerPath: "mainProvider",
  baseQuery: baseQuery,
  tagTypes: [
    "users",
    "jobs",
    "skills",
    "squadLeads",
    "constants",
    "positions",
    "projects",
    "candidatejobs",
    "profile",
  ],
  endpoints: () => ({}),
});
