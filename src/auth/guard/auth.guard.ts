import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let tokenId = request.headers.token;

    if (!tokenId) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(tokenId);
    } catch (e) {
      throw new UnauthorizedException();
    }
    const decodeToken = this.jwtService.decode(tokenId);
    if (!decodeToken) {
      throw new UnauthorizedException();
    }
    request.user = decodeToken;
    return true;
  }
}
