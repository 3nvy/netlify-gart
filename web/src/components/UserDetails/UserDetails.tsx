import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { UserData, UserVars } from "../../types/graphql";

const GET_USER = gql`
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

const UserDetails = () => {
    const navigate = useNavigate();
    const { id = "" } = useParams();
    const { loading, error, data } = useQuery<UserData, UserVars>(GET_USER, {
        variables: { id },
    });

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <p>
                Name: {data?.user.firstName} {data?.user.surName}
            </p>
            <p>Age: {data?.user.age}</p>
            <p>Occupation: {data?.user.occupation}</p>
        </div>
    );
};

export default UserDetails;
