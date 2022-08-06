export type ProfileValues = {
    id: string;
    firstName: string;
    surName: string;
    age: number;
    occupation: string;
};

export type ProfileData = {
    profile: ProfileValues;
};

export type ProfileVars = {
    id: string;
};

export type UpdateProfileDetails = Omit<ProfileValues, "id">;
