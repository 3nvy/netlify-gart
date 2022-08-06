import { useState } from "react";
import { useGetProfilesRolesQuery, useRemoveProfileFromRoleMutation } from "../../hooks/queries";
import { RoleValue } from "../../types/graphql";

const ProfileRoleBadge = ({ role, profileId }: { role: string; profileId: string }) => {
    const { removeProfileFromRole } = useRemoveProfileFromRoleMutation();

    const roleDeleteHandler = () => {
        console.log(role, profileId);
        removeProfileFromRole({
            variables: {
                roleName: role,
                profileId,
            },
        }).then(console.log);
    };

    return (
        <>
            <div className="w-auto text-white bg-gray-600 m-4">
                <div className="container flex items-center justify-between px-6 py-2 mx-auto">
                    <div className="flex">
                        <button
                            onClick={() => roleDeleteHandler()}
                            className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 18L18 6M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="mx-3">{role}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const ProfileRoleCard = ({
    id,
    name,
    email,
    roles = [],
}: {
    id: string;
    name: string;
    email: string;
    roles: RoleValue[] | undefined;
}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className="border-2 border-gray-100 rounded-lg">
            <button onClick={() => toggleVisibility()} className="flex items-center justify-between w-full p-8">
                <h1 className="font-semibold text-gray-700">
                    {name} - {email}
                </h1>

                {visible ? (
                    <span className="text-gray-400 bg-gray-200 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                        </svg>
                    </span>
                ) : (
                    <span className="text-white bg-gray-600 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </span>
                )}
            </button>

            {visible && (
                <>
                    <hr className="border-gray-200" />
                    <div className="flex flex-wrap">
                        {roles.map((role) => (
                            <ProfileRoleBadge key={role.id} profileId={id} role={role.name} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const ProfileRolesList = () => {
    const { profiles, loading, error } = useGetProfilesRolesQuery();

    if (loading) return <p className="mt-10 text-center">Loading...</p>;
    if (error) return <p className="mt-10 text-center">Something Went Wrong</p>;

    return (
        <section className="bg-white ">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
                <h1 className="text-4xl font-semibold text-center text-gray-800 ">Profile Role Management</h1>

                <div className="mt-12 space-y-8">
                    {profiles?.map((profile) => (
                        <ProfileRoleCard
                            key={profile.id}
                            id={profile.id}
                            name={profile.userName}
                            email={profile.email}
                            roles={profile.roles}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfileRolesList;
