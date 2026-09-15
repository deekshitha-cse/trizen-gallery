import { UserRole } from "@prisma/client";
import { Request } from "@nestjs/common";

export interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        role: UserRole;
    };
}