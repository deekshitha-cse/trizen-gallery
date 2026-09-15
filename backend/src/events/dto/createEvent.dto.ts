import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}