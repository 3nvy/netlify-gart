import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
    query GetProfileQuery {
        profile {
            id
            firstName
            surName
            occupation
            age
        }
    }
`;

export const UPDATE_PROFILE_MUTATION = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
        profile: updateProfile(input: $input) {
            id
            firstName
            surName
            occupation
            age
        }
    }
`;

export const DELETE_PROFILE_ROLE = gql`
    mutation RemoveProfileFromRole($roleName: String, $profileId: ID) {
        profile: removeProfileFromRole(roleName: $roleName, profileId: $profileId) {
            id
            firstName
            surName
            occupation
            age
        }
    }
`;

export const GET_PROFILES_ROLES = gql`
    query GetProfilesRoles {
        profiles {
            id
            userName
            email
            roles {
                id
                name
            }
        }
    }
`;
