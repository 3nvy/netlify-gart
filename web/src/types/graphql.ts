export type User = {
    id: string;
    firstName: string;
    surName: string;
    age: number;
    occupation: string;
};

export type UsersData = {
    users: User[];
};

export type UserData = {
    user: User;
};

export type UserVars = {
    id: string;
};

export type CreateUserDetails = Omit<User, "id">;
