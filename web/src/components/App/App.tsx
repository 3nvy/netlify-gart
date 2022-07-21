import { Routes, Route } from "react-router-dom";
import UserList from "../UserList/UserList";
import UserDetails from "../UserDetails/UserDetails";

function App() {
    return (
        <div className="App">
            <h1>Project Skeleton with Apollo (Client/Server), GraphQL and React</h1>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
        </div>
    );
}

export default App;
