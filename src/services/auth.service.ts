import { mainProvider } from "./provider/main.provider";

const authExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      undefined,
      {
        email: string | undefined;
        password: string | undefined;
      }
    >({
      query: (args) => {
        const { email, password } = args;
        return {
          url: "/login",
          method: "POST",
          body: {
            email,
            password,
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authExtendedApi;
