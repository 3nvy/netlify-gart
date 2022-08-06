export type RoleValue = {
    id: string;
    name: string;
};

export type ProfileValues = {
    id: string;
    userName: string;
    email: string;
    firstName?: string;
    surName?: string;
    age?: number;
    occupation?: string;
    roles?: RoleValue[];
};

export type ProfileData = {
    profile: ProfileValues;
};

export type ProfilesData = {
    profiles: ProfileValues[];
};

export type UpdateProfileDetails = Omit<ProfileValues, "id">;

export type RemoveProfileFromRoleInput = {
    profileId: string;
    roleName: string;
};
