import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
    query GetProfileQuery() {
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
