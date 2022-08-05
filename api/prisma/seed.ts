import prisma from "./db";

import { Prisma } from "@prisma/client";

const rolesData: Prisma.RoleCreateInput[] = [{ name: "visitor" }, { name: "admin" }];

const load = async () => {
    try {
        await prisma.role.createMany({
            data: rolesData,
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};
load();
