import { Handler } from "@netlify/functions";
import { reqError, reqSuccess } from "../../helpers/helpers";
import PrismaDB from "../../prisma/db";

export const handler: Handler = async (event, context) => {
    const { user } = JSON.parse(event.body || "{}");

    if (!user) return reqError("No User Provided!");

    console.log(user);

    /**
     * Syncs Identity Roles From Profiles Roles On Login
     */
    try {
        const profileRoles = await PrismaDB.role.findMany({
            where: { profiles: { some: { id: user.id } } },
        });

        /**
         * The commented code above syncs identity roles with profile roles, but that means if you remove a profile role it wont take effect as identity will just sync again,
         * so its commented out and used only for testing purposes
         */

        // const identityRoles: string[] = user?.app_metadata?.roles || ["visitor"];
        // const mergedRoles = [...new Set([...profileRoles.map((role) => role.name), ...identityRoles])];

        // if (mergedRoles.length !== profileRoles.length) {
        //     await PrismaDB.profile.update({
        //         include: { roles: true },
        //         where: { id: user.id },
        //         data: {
        //             roles: {
        //                 connectOrCreate: [
        //                     ...(mergedRoles.map((role) => ({
        //                         create: {
        //                             name: role,
        //                         },
        //                         where: {
        //                             name: role,
        //                         },
        //                     })) as any[]),
        //                 ],
        //             },
        //         },
        //     });
        // }

        return reqSuccess("User Loggedin Successfully", {
            app_metadata: {
                roles: profileRoles.map((role) => role.name),
            },
        });
    } catch (err) {
        return reqError("Unable to Assign Roles!");
    }
};
