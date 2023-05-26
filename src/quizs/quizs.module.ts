import { Module } from '@nestjs/common';
import { QuizsController } from './quizs.controller';
import { QuizsService } from './quizs.service';
import { QuizRepository } from './quiz.repository';
import { KnexConfigModule } from 'src/knex-config/knex-config.module';

@Module({
  imports: [KnexConfigModule],
  controllers: [QuizsController],
  providers: [QuizsService, QuizRepository],
})
export class QuizsModule {}
