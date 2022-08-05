import netlifyIdentity, { User } from "netlify-identity-widget";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
    currentUser: User | null;
};

const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
});

const identity: any = netlifyIdentity;

export const AuthProvider = ({ children }: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        netlifyIdentity.on("login", (user) => {
            setCurrentUser(user);
            netlifyIdentity.close();
        });
        netlifyIdentity.on("logout", () => {
            setCurrentUser(null);
            netlifyIdentity.close();
        });

        netlifyIdentity.init();

        return () => {
            netlifyIdentity.off("login");
            netlifyIdentity.off("logout");
        };
    }, []);

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const { currentUser } = useContext(AuthContext);

    return {
        currentUser,
        open: () => netlifyIdentity.open(),
        login: () => netlifyIdentity.open("login"),
        signup: () => netlifyIdentity.open("signup"),
        logout: netlifyIdentity.logout,
    };
};
