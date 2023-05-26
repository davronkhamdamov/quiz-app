import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { KnexConfigModule } from 'src/knex-config/knex-config.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../constants/constants';

@Module({
  imports: [
    KnexConfigModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
