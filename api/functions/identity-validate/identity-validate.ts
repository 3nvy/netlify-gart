import { Handler } from "@netlify/functions";
import PrismaDB from "../../prisma/db";

export const handler: Handler = async (event, context) => {
    const { user } = JSON.parse(event.body || "{}");

    if (!user) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "No User Provided!",
            }),
        };
    }

    // Tries to add profile entry from provided user data
    try {
        await PrismaDB.profile.create({
            data: {
                id: user.id,
                email: user.email,
                userName: user.user_metadata?.full_name,
                roles: {
                    connect: {
                        name: "visitor", // Make sure you have a visitor role in your database or run `yarn run prisma:seed` to add `visitor` & `admin` roles
                    },
                },
            },
        });
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Unable to Create Profile",
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Successfully Generated User Profile",
        }),
    };
};
