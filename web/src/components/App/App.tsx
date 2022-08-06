import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Profile from "../Profile/Profile";
import { useAuthContext } from "../../context/authContext";
import ProfileRolesList from "../ProfileRolesList/ProfileRolesList";

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
                <Route
                    path="/"
                    element={<h1 className="text-5xl text-center mt-10">Netlify Identity Auth Example</h1>}
                />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<PrivateRoute roles={["admin"]} />}>
                    <Route path="/roles" element={<ProfileRolesList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
