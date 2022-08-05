import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const NavLink = ({ to, children }: { to: string; children?: string }) => {
    return (
        <Link
            to={to}
            className="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
        >
            {children}
        </Link>
    );
};

const NavBar = () => {
    const { open, login, signup, currentUser } = useAuthContext();
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <p className="text-1xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white uppercase">
                                Netlify Identity
                            </p>
                        </div>

                        <div className="flex md:hidden">
                            <button
                                type="button"
                                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="items-center md:flex">
                        <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
                            <NavLink to="/">Home</NavLink>
                        </div>

                        <div className="flex items-center py-2 -mx-1 md:mx-0">
                            {!currentUser ? (
                                <>
                                    <button
                                        onClick={() => login()}
                                        className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => signup()}
                                        className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => open()}
                                        type="button"
                                        className="flex items-center focus:outline-none"
                                        aria-label="toggle profile dropdown"
                                    >
                                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                            <img
                                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                className="object-cover w-full h-full"
                                                alt="avatar"
                                            />
                                        </div>

                                        <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
                                            {currentUser.email}
                                        </h3>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
