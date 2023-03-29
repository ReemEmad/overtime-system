import { mainProvider } from "./provider/main.provider";

const skillExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getAppConstants: builder.query({
      query: () => {
        return {
          url: "/constants",
        };
      },
      providesTags: ["constants"],
    }),
  }),
});

export const { useGetAppConstantsQuery } = skillExtendedApi;
