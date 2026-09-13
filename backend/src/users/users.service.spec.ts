import {Test, TestingModule} from "@nestjs/testing";
import { UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { UsersService } from "./users.service.js";

describe("UserService", () => {
    let userService: UsersService;

    const prismaMock = {
        user: {
            findUnique: vi.fn(),
            create: vi.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                UsersService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();
        
        userService = module.get<UsersService>(UsersService);
    });

    it("should find a user by email", async () => {
        const user ={
            id: "1",
            name: "Test User",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
            createdAt: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(user);
        const result = await userService.findByEmail("test@example.com");
        expect(result).toEqual(user);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where:{
                email: "test@example.com",
            },
        });
    });

    it("should find a user by id", async () => {
        const user = {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
            createdAt: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(user);
        const result = await userService.findById("1");
        expect(result).toEqual(user);
        expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
            where:{
                id: "1",
            },
        });
    });

    it("should create a user by its data", async () => {
        const data = {
            name: "Test User",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
        };

        const user = {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
            createdAt: new Date(),
        }

        prismaMock.user.create.mockResolvedValue(user);
        const result = await userService.create(data);
        expect(result).toEqual(user);
        expect(prismaMock.user.create).toHaveBeenCalledWith({
            data,
        });

    });

})