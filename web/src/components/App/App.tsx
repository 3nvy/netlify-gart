import { Routes, Route } from "react-router-dom";
import UserList from "../UserList/UserList";
import UserDetails from "../UserDetails/UserDetails";
import { CreateUser } from "../CreateUser/CreateUser";

function App() {
    return (
        <div className="App">
            <h1>GraphQL, Apollo, React and Typescript skeleton using Netlify Functions</h1>

            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/user/create" element={<CreateUser />} />
            </Routes>
        </div>
    );
}

export default App;
