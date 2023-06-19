import {mainProvider} from "./provider/main.provider";
import {profileRes, userProfile} from "../data/DTO/Profile";

const profileExtendedApi = mainProvider.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => {
                return {
                    url: `/profile`,
                };
            },
            providesTags: ["profile"],
        }),
        updateProfile: builder.mutation<profileRes, userProfile>({
            query: (body) => {
                return {
                    url: `/profile`,
                    method: "Put",
                    body,
                };
            },
            invalidatesTags: ["profile"],
        }),
        deleteProfileSkill: builder.mutation<any, any>({
            query: ({skillId}) => {
                return {
                    url: `/user-skills/${skillId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useDeleteProfileSkillMutation,
} = profileExtendedApi;
