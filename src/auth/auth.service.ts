import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { ILoginUser, IRegisterUser } from './interface/auth.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async getUser() {
    return await this.authRepo.getUser();
  }
  async getUserInfo(id: string) {
    return await this.authRepo.getUserInfo(id);
  }
  async register(user: IRegisterUser) {
    const dbUsers = await this.getUser();
    const foundedUser = dbUsers.find(
      (e: { email: String }) => e.email === user.email,
    );
    if (foundedUser) {
      return new ConflictException('User already exist');
    }
    const payload = {
      id: user.isGoogleAuth ? user.id : null,
      username: user.username,
      email: user.email,
      password: user.isGoogleAuth
        ? null
        : bcrypt.hashSync(user.password.toString(), 12),
      photo: user.photo
        ? user.photo
        : 'https://res.cloudinary.com/didddubfm/image/upload/v1685111301/585e4bf3cb11b227491c339a_u83hf7.png',
    };
    await this.authRepo.register(payload);
    return { access_token: await this.jwtService.signAsync({ id: user.id }) };
  }

  async login(user: ILoginUser) {
    const dbUsers = await this.getUser();
    const foundedUser = dbUsers.find(
      (e: { email: String }) => e.email === user.email,
    );
    if (!foundedUser) {
      return new UnauthorizedException('User not found');
    }
    if (user.isGoogleAuth) {
      const payload = { id: foundedUser.id };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    const isPasswordValid = bcrypt.compareSync(
      user.password.toString(),
      foundedUser.password,
    );
    if (!isPasswordValid) {
      return new BadRequestException('Password not match');
    }
    const payload = { id: foundedUser.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
