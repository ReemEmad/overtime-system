import { mainProvider } from "./provider/main.provider";
import { JobDTO, updateJobDto } from "../data/DTO/Job";

const jobExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => {
        return {
          url: `/job-positions?page_number=${params.page_number}&page_size=${params.page_size}`,
        };
      },
      providesTags: ["jobs"],
    }),
    updateJob: builder.mutation<
      JobDTO,
      { id: string | undefined; body: updateJobDto }
    >({
      query: ({ id, body }) => ({
        url: `/job-position/${id}`,
        method: "Patch",
        body,
      }),
      invalidatesTags: ["jobs"],
    }),
    postJob: builder.mutation<
      updateJobDto,
      {
        name: string | undefined;
        description: string | undefined;
      }
    >({
      query: (args) => {
        const { name, description } = args;
        return {
          url: "/job-position",
          method: "POST",
          body: {
            name,
            description,
          },
        };
      },
      invalidatesTags: ["jobs"],
    }),
    deleteJob: builder.mutation<JobDTO, string>({
      query: (id) => ({
        url: `/job-position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  usePostJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobExtendedApi;
