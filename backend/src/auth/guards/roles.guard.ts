import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { ROLES_KEY } from "../decorators/roles.decorator.js";
import type { AuthenticatedRequest } from "../types/authenticated-request.js";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]> (
            ROLES_KEY,
            [
                context.getHandler,
                context.getClass
            ],
        );
        if(!requiredRoles || requiredRoles.length == 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const userRole = request.user.role;

        if(!requiredRoles.includes(userRole)) {
            throw new ForbiddenException();
        }

        return true;
    }
}