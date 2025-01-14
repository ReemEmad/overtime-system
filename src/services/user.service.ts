import { mainProvider } from "./provider/main.provider";
import { userDataDto } from "../data/DTO/User";

const userExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: `/users/managers`,
        };
      },
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<
      userDataDto,
      { id: string | undefined; body: userDataDto }
    >({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "Put",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    postUser: builder.mutation<
      userDataDto,
      {
        name: string | undefined;
        work_title: string | undefined;
        phone: string | undefined;
        work_location: string | undefined;
        email: string | undefined;
        password: string | undefined;

        role_name: string | undefined;
      }
    >({
      query: (args) => {
        const {
          name,
          work_title,
          phone,
          work_location,
          email,
          password,
          role_name,
        } = args;
        return {
          url: "/users",
          method: "POST",
          body: {
            name,
            work_title,
            phone,
            work_location,
            email,
            password,

            role_name,
          },
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<userDataDto | any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    registerCandidate: builder.mutation<
      userDataDto,
      {
        name: string | undefined;
        work_title: string | undefined;
        phone: string | undefined;
        work_location: string | undefined;
        email: string | undefined;
        password: string | undefined;
        squadLead: string | undefined;
      }
    >({
      query: (args) => {
        const {
          name,
          work_title,
          phone,
          work_location,
          email,
          password,
          squadLead,
        } = args;
        return {
          url: "/register",
          method: "POST",
          body: {
            name,
            work_title,
            phone,
            work_location,
            email,
            password,
            squadLead,
          },
        };
      },
    }),
    getSquadLeads: builder.query({
      query: () => {
        return {
          url: `/squad-leads`,
        };
      },
      providesTags: ["squadLeads"],
    }),
    getCandidateJobs: builder.query({
      query: () => {
        return {
          url: "/user/jobs",
        };
      },
      providesTags: ["candidatejobs"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePostUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRegisterCandidateMutation,
  useGetSquadLeadsQuery,
  useGetCandidateJobsQuery,
} = userExtendedApi;
