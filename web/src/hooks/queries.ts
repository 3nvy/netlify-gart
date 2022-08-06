import { useQuery } from "@apollo/client";
import { GET_PROFILE_QUERY } from "../graphql/queries";
import { ProfileData, ProfileVars } from "../types/graphql";

export const useGetProfileQuery = () => {
    const { data, loading, error } = useQuery<ProfileData, ProfileVars>(GET_PROFILE_QUERY);

    return {
        profile: data?.profile,
        loading,
        error,
    };
};
