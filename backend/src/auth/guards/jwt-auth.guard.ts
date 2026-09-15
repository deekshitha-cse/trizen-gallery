import { CanActivate, Injectable, ExecutionContext,UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if(!authHeader) {
            throw new UnauthorizedException();
        }
        const [type, token] = authHeader.split(" ");
        if(type !== "Bearer" || !token) {
            throw new UnauthorizedException();
        }
        try{
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}