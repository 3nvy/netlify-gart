import { useMutation, useQuery } from "@apollo/client";
import {
    DELETE_PROFILE_ROLE,
    GET_PROFILES_ROLES,
    GET_PROFILE_QUERY,
    UPDATE_PROFILE_MUTATION,
} from "../graphql/queries";
import {
    ProfileData,
    ProfilesData,
    ProfileValues,
    RemoveProfileFromRoleInput,
    UpdateProfileDetails,
} from "../types/graphql";

export const useGetProfileQuery = () => {
    const { data, loading, error } = useQuery<ProfileData>(GET_PROFILE_QUERY);

    return {
        profile: data?.profile,
        loading,
        error,
    };
};

export const useUpdateProfileMutation = () => {
    const [updateProfile, { loading, error }] = useMutation<
        { updateProfile: ProfileValues },
        { input: UpdateProfileDetails }
    >(UPDATE_PROFILE_MUTATION);

    return {
        updateProfile,
        loading,
        error,
    };
};

export const useRemoveProfileFromRoleMutation = () => {
    const [removeProfileFromRole, { loading, error }] = useMutation<
        { updateProfile: ProfileValues },
        RemoveProfileFromRoleInput
    >(DELETE_PROFILE_ROLE, {
        refetchQueries: [
            { query: GET_PROFILES_ROLES }, // DocumentNode object parsed with gql
            "GetProfilesRoles", // Query name
        ],
    });

    return {
        removeProfileFromRole,
        loading,
        error,
    };
};

export const useGetProfilesRolesQuery = () => {
    const { data, loading, error } = useQuery<ProfilesData>(GET_PROFILES_ROLES);

    return {
        profiles: data?.profiles,
        loading,
        error,
    };
};
