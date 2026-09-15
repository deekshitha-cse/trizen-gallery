import { Test, TestingModule } from "@nestjs/testing";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

describe("AuthController", () => {
    let controller: AuthController;

    const mockAuthService = {
        login: vi.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("should call authService.login and return the result", async () => {
        const loginDto = {
            email: "test@example.com",
            password: "password123",
        };

        const result = {
            token: "fake-token",
        };

        mockAuthService.login.mockResolvedValue(result);

        const response = await controller.login(loginDto);

        expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
        expect(response).toEqual(result);
    });
});