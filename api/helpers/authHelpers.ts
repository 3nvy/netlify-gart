export const hasAuth = (user: any) => {
    if (!user) throw `User is not authenticated!`;
};

export const hasRole = (user: any, roles: string[]) => {};
