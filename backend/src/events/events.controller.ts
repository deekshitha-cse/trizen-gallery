import { Body, Controller, Post, Req } from "@nestjs/common";
import { EventsService } from "./events.service.js";
import { CreateEventDto } from "./dto/createEvent.dto.js";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import type { AuthenticatedRequest } from "../auth/types/authenticated-request.js";

@Controller()
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @UseGuards(JwtAuthGuard)
    @Post("events")
    async create(
        @Body() createEventDto: CreateEventDto,
        @Req() request: AuthenticatedRequest,
    ) {
        const userId = request.user.userId;
        return this.eventsService.create(createEventDto, userId);
    }
}