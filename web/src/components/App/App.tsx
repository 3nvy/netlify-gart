import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import { useAuthContext } from "../../context/authContext";

const PrivateRoute = ({ roles = [] }: { roles?: string[] }) => {
    const { currentUser } = useAuthContext();
    const userRoles = currentUser?.app_metadata.roles || [];
    const hasValidRole = !roles.length || roles.some((role) => userRoles.includes(role));

    return currentUser && hasValidRole ? <Outlet /> : <Navigate to="/" />;
};

function App() {
    return (
        <div className="App">
            <NavBar />

            <Routes>
                <Route path="/" element={<>Dashboard</>} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
