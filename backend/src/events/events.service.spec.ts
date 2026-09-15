import { Test, TestingModule } from "@nestjs/testing";
import { EventsService } from "./events.service.js";
import { PrismaService } from "../prisma/prisma.service.js";

describe("EventsService", () => {
    let eventsService: EventsService;

    const prismaMock = {
        event: {
            create: vi.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: PrismaService,
                    useValue: prismaMock,
                },
            ],
        }).compile();

        eventsService = module.get<EventsService>(EventsService);
    });

    it("Creates an event and associates it to a user", async () => {
        const createEventDto = {
            name: "Wedding Photography",
        }

        const userId = "1"

        const event = {
            id: "1",
            name: "Wedding Photography",
            createdById: "1",
            createdAt: new Date(),
        }
        
        prismaMock.event.create.mockResolvedValue(event)
        const result = await eventsService.create(createEventDto, userId)
        expect(result).toEqual(event);
        expect(prismaMock.event.create).toHaveBeenCalledWith({
            data: {
                name: createEventDto.name,
                createdById: userId
            }
        });
    });
})