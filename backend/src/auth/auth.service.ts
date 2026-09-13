import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service.js";
import { LoginDto } from "./dto/login.dto.js";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor (
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if(!user) {
            throw new UnauthorizedException();
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if(!isPasswordValid) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign({
            userId: user.id,
            role: user.role,
        });

        return { token };
    }
}