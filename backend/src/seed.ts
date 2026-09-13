import "dotenv/config";

import { UsersService } from "./users/users.service.js";
import { PrismaService } from "./prisma/prisma.service.js";
import { UserRole } from "@prisma/client";

async function seed(){
    const prismaService = new PrismaService();
    const usersService = new UsersService(prismaService);

    await usersService.create({
        name: "Test Admin",
        email: "admin@test.com",
        passwordHash: "$2b$10$n6R/.U0XfWebbbhmI7CpReHnSwATwJbXTjIDUpHJHgYjLdSJowGZe",
        role: UserRole.ADMIN,
    });

    await prismaService.$disconnect();
}

seed();