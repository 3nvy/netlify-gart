import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateUserDetails, User } from "../../types/graphql";
import { useNavigate } from "react-router-dom";
import { CREATE_USER_MUTATION, GET_USERS } from "../../graphql/queries";

export const CreateUser = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [age, setAge] = useState(0);
    const [occupation, setOccupation] = useState("");

    const [createUser, { error, loading }] = useMutation<{ createUser: User }, { input: CreateUserDetails }>(
        CREATE_USER_MUTATION,
        {
            refetchQueries: [{ query: GET_USERS }, "GetUsers"],
        }
    );

    const clearForm = () => {
        setFirstName("");
        setSurName("");
        setAge(0);
        setOccupation("");
    };

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        createUser({
            variables: {
                input: {
                    firstName,
                    surName,
                    age,
                    occupation,
                },
            },
        })
            .then(console.log)
            .finally(clearForm);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go back</button>
            <br />
            <br />

            {error && <div>Something went wrong</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(evt) => setFirstName(evt.target.value)}
                    />
                </label>

                <br />
                <br />

                <label>
                    Last Name:
                    <input
                        type="text"
                        name="surName"
                        value={surName}
                        onChange={(evt) => setSurName(evt.target.value)}
                    />
                </label>

                <br />
                <br />

                <label>
                    Age:
                    <input type="number" name="age" value={age} onChange={(evt) => setAge(+evt.target.value)} />
                </label>

                <br />
                <br />

                <label>
                    Occupation:
                    <input
                        type="text"
                        name="occupation"
                        value={occupation}
                        onChange={(evt) => setOccupation(evt.target.value)}
                    />
                </label>

                <br />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
