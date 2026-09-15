import { Body, Controller, Post, Req } from "@nestjs/common";
import { EventsService } from "./events.service.js";
import { CreateEventDto } from "./dto/createEvent.dto.js";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import type { AuthenticatedRequest } from "../auth/types/authenticated-request.js";
import { UserRole } from "@prisma/client";
import { Roles } from "../auth/decorators/roles.decorator.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";

@Controller()
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post("events")
    async create(
        @Body() createEventDto: CreateEventDto,
        @Req() request: AuthenticatedRequest,
    ) {
        const userId = request.user.userId;
        return this.eventsService.create(createEventDto, userId);
    }
}