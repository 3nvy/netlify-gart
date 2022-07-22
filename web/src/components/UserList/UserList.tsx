import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_USERS } from "../../graphql/queries";
import { UsersData } from "../../types/graphql";

const UserList = () => {
    const { loading, error, data } = useQuery<UsersData>(GET_USERS);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Something Went Wrong</p>;

    console.log(data);

    return (
        <div>
            <Link to={`/user/create`}> Create New User</Link>

            <h2>List of Users:</h2>
            <ul>
                {data?.users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            {user.firstName} {user.surName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
