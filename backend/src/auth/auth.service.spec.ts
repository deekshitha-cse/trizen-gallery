import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service.js";
import { UsersService } from "../users/users.service.js";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "@prisma/client";
import { vi } from "vitest";

vi.mock("bcrypt", () => ({
    compare: vi.fn(),
}))

import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

describe("AuthService", () => {
    let authService: AuthService;

    const usersServiceMock = {
        findByEmail: vi.fn(),
    };

    const jwtServiceMock = {
        sign: vi.fn(),
    };

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: usersServiceMock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
            ],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    });

    it("should login successfully", async () => {
        const user = {
            id: "user-123",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
        };

        usersServiceMock.findByEmail.mockResolvedValue(user);
        jwtServiceMock.sign.mockReturnValue("fake-jwt-token");
        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
        const result = await authService.login({
            email:user.email,
            password: "correct-password",
        });

        expect(result).toEqual({
            token: "fake-jwt-token",
        });

        expect(usersServiceMock.findByEmail).toHaveBeenCalledWith(
            user.email,
        );

        expect(jwtServiceMock.sign).toHaveBeenLastCalledWith({
            userId: user.id,
            role: user.role,
        });

    });

    it("should throw UnauthorizedException if user does not exist", async() => {
        usersServiceMock.findByEmail.mockResolvedValue(null);
        await expect(
            authService.login({
                email: "nonexistent@example.com",
                password: "some-password",
            }),
        ).rejects.toThrow(UnauthorizedException);

        expect(usersServiceMock.findByEmail).toHaveBeenCalledWith("nonexistent@example.com")
    })

    it("should throw UnauthorizedException if password is incorrect", async () => {
        const user = {
            id: "user-123",
            email: "test@example.com",
            passwordHash: "hashed-password",
            role: UserRole.TEAM_MEMBER,
        };

        usersServiceMock.findByEmail.mockResolvedValue(user);
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
        await expect(
            authService.login({
                email: user.email,
                password: "wrong-password",
            }),
        ).rejects.toThrow(UnauthorizedException);
    });
});