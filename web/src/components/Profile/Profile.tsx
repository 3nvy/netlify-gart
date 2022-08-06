import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "../../context/authContext";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../hooks/queries";
import { UpdateProfileDetails } from "../../types/graphql";

const SuccessToast = ({ visible }: { visible: boolean }) => {
    if (!visible) return <></>;
    return (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
            <div className="flex items-center justify-center w-12 bg-emerald-500">
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
            </div>

            <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                    <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Your account was updated!</p>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const { register, handleSubmit } = useForm<UpdateProfileDetails>();
    const { currentUser } = useAuthContext();
    const { profile, loading } = useGetProfileQuery();
    const { updateProfile } = useUpdateProfileMutation();

    const onSubmit: SubmitHandler<UpdateProfileDetails> = (data) =>
        updateProfile({
            variables: {
                input: data,
            },
        }).then(() => {
            setShowSuccessDialog(true);
            setTimeout(() => setShowSuccessDialog(false), 2000);
        });

    if (loading) return <>Loading....</>;

    return (
        <>
            <SuccessToast visible={showSuccessDialog} />
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md mt-10">
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Account settings (Not Editable)</h2>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700">
                            Username
                            <p className=" block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                                {currentUser?.user_metadata?.full_name}
                            </p>
                        </label>
                    </div>

                    <div>
                        <label className="text-gray-700">
                            Email
                            <p className=" block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                                {currentUser?.email}
                            </p>
                        </label>
                    </div>
                </div>
                <div className="mt-5">
                    <label className="text-gray-700">
                        Roles
                        <p className=" block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                            {currentUser?.app_metadata.roles.join(" | ")}
                        </p>
                    </label>
                </div>
            </section>

            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md mt-10">
                <h2 className="text-lg font-semibold text-gray-700 capitalize">Profile settings</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700">
                                First Name
                                <input
                                    {...register("firstName")}
                                    defaultValue={profile?.firstName}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="text-gray-700">
                                Last Name
                                <input
                                    {...register("surName")}
                                    defaultValue={profile?.surName}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="text-gray-700">
                                Age
                                <input
                                    {...(register("age"), { valueAsNumber: true })}
                                    defaultValue={`${profile?.age || ""}`}
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="text-gray-700">
                                Occupation
                                <input
                                    {...register("occupation")}
                                    defaultValue={profile?.occupation}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Profile;
