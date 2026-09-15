import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module.js";
import { AuthService } from "./auth.service.js";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller.js";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./guards/jwt-auth.guard.js";

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject:[ConfigService], useFactory:(configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
            }),
        }), 
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    exports:[JwtAuthGuard, JwtModule],
})
export class AuthModule{}