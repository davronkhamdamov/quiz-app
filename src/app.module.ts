import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KnexConfigModule } from './knex-config/knex-config.module';
import { QuizsModule } from './quizs/quizs.module';

@Module({
  imports: [AuthModule, KnexConfigModule, QuizsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
