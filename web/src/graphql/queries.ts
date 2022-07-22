import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers {
        users {
            id
            firstName
            surName
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            firstName
            surName
            age
            occupation
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUser!) {
        user: createUser(input: $input) {
            id
            firstName
            surName
            age
            occupation
        }
    }
`;
