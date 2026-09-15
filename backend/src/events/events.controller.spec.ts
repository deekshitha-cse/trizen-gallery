import { Test, TestingModule } from "@nestjs/testing";
import { EventsController } from "./events.controller.js";
import { EventsService } from "./events.service.js";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { AuthenticatedRequest } from "../auth/types/authenticated-request.js";

describe("EventsController", () => {
    let controller: EventsController;

    const mockEventsService = {
        create: vi.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [
                {
                    provide: EventsService,
                    useValue: mockEventsService,
                },
            ],
        }).overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true }).compile();

        controller = module.get<EventsController>(EventsController);
    });

    it("should call eventsService.create and return the result", async () => {
        const createEventDto = {
            name: "Wedding Photography",
        };

        const request = {
            user:{
                userId: "1",
                role: UserRole.ADMIN,
            }
        } as AuthenticatedRequest;

        const result = {
            id: "1",
            name: "Wedding Photography",
            createdById: "1",
            createdAt: new Date(),
        };

        mockEventsService.create.mockResolvedValue(result);
        const response = await controller.create(createEventDto, request);
        expect(response).toEqual(result)
        expect(mockEventsService.create).toHaveBeenCalledWith(
            createEventDto,
            request.user.userId
        );
    });
})