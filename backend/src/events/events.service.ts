import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateEventDto } from "./dto/createEvent.dto.js";

@Injectable()
export class EventsService {
    constructor(private readonly prismaService: PrismaService) {}
    async create(createEventDto: CreateEventDto, userId: string) {
        return this.prismaService.event.create({
            data: {
            name: createEventDto.name,
            description: createEventDto.description,
            createdById : userId,
            },
        });
    }
}