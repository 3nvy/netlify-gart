import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { UsersData } from "../../types/graphql";

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            firstName
            surName
        }
    }
`;

const UserList = () => {
    const { loading, error, data } = useQuery<UsersData>(GET_USERS);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Something Went Wrong</p>;

    console.log(data);

    return (
        <ul>
            {data?.users.map((user) => (
                <li key={user.id}>
                    <Link to={`/user/${user.id}`}>
                        {user.firstName} {user.surName}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
