import { JobDTO } from "../data/DTO/Job";
import { JobToEdit, JobToPost } from "../data/DTO/JobToPost";
import { mainProvider } from "./provider/main.provider";

const skillExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => {
        return {
          url: "/projects",
        };
      },
      // providesTags: ["positions"],
    }),
    getPositions: builder.query({
      query: () => {
        return {
          url: "/jobs",
        };
      },
      providesTags: ["positions"],
    }),
    postPositions: builder.mutation<JobToPost, JobToPost>({
      query: (args) => {
        const {
          project_id,
          job_name,
          job_expected_start_date,
          job_weekly_hours_required,
          skill_ids,
          job_employee_required_position,
          job_tpl_name,
          job_expected_end_date,
        } = args;
        return {
          url: "/jobs",
          method: "POST",
          body: {
            project_id,
            job_name,
            job_expected_start_date,
            job_weekly_hours_required,
            skill_ids,
            job_employee_required_position,
            job_tpl_name,
            job_expected_end_date,
          },
        };
      },
      invalidatesTags: ["positions"],
    }),
    updateSkillPosition: builder.mutation<any, any>({
      query: (args) => {
        const { jobId } = args;
        return {
          url: `/job-skills/${jobId}`,
          method: "Post",
          body: {
            skill_list: [],
          },
        };
      },
    }),
    updatePosition: builder.mutation<
      JobToEdit,
      { id: string | undefined; body: JobToEdit }
    >({
      query: ({ id, body }) => ({
        url: `/job/${id}`,
        method: "Put",
        body,
      }),
      invalidatesTags: ["positions"],
    }),
    deletePosition: builder.mutation<any, any>({
      query: (id) => ({
        url: `/job-position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["positions"],
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetProjectsQuery,
  usePostPositionsMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = skillExtendedApi;