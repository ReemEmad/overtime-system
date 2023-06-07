import { mainProvider } from "./provider/main.provider";
import { skillDto, updateSkillDto } from "../data/DTO/Skill";

const skillExtendedApi = mainProvider.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: (params) => {
        return {
          url: `/skills?page_number=${params.page_number}&page_size=${params.page_size}`,
        };
      },
      providesTags: ["skills"],
    }),
    updateSkill: builder.mutation<
      skillDto,
      { id: string | undefined; body: updateSkillDto }
    >({
      query: ({ id, body }) => ({
        url: `/skill/${id}`,
        method: "Put",
        body,
      }),
      invalidatesTags: ["skills"],
    }),
    postSkill: builder.mutation<
      updateSkillDto,
      {
        name: string | undefined;
        description: string | undefined;
      }
    >({
      query: (args) => {
        const { name, description } = args;
        return {
          url: "/skill",
          method: "POST",
          body: {
            name,
            description,
          },
        };
      },
      invalidatesTags: ["skills"],
    }),
    deleteSkill: builder.mutation<skillDto, string>({
      query: (id) => ({
        url: `/skill/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"],
    }),
    postCandidateSkill: builder.mutation<any, any>({
      query: (args) => {
        return {
          url: "/user-skills",
          method: "POST",
          body: {
            skills: args,
          },
        };
      },
    }),
  }),
});

export const {
  useGetSkillsQuery,
  usePostSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  usePostCandidateSkillMutation,
} = skillExtendedApi;
