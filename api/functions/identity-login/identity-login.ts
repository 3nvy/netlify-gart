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

    console.log(user);

    /**
     * SYNCS PROFILE ROLES WITH IDENTITY ROLES ON LOGIN
     */
    try {
        const roles = await PrismaDB.role.findMany({
            where: { profiles: { some: { id: user.id } } },
        });

        const roleNames = roles.map((role) => role.name);

        return {
            statusCode: 200,
            body: JSON.stringify({
                app_metadata: {
                    roles: roleNames,
                },
            }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Unable to Assign Roles",
            }),
        };
    }
};
