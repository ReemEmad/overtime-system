import { mainProvider } from "./provider/main.provider";

const authExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getPendingJob: builder.query({
      query: () => {
        return {
          url: "/cfo/pending-job",
        };
      },
      providesTags: ["pendingJob"],
    }),
    approveJob: builder.mutation<
      undefined,
      {
        id: number | undefined;
      }
    >({
      query: (args) => {
        const { id } = args;
        return {
          url: `/cfo/approve-job/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["pendingJob"],
    }),
  }),
});

export const { useGetPendingJobQuery, useApproveJobMutation } = authExtendedApi;
