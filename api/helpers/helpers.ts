export const reqError = (message: string) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message,
        }),
    };
};

export const reqSuccess = (message: string, data?: any) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message,
            ...(data && data),
        }),
    };
};
