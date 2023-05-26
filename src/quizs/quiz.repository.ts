import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { KnexConfig } from 'src/knex-config/knexConfig';
import { IQuiz } from './interface/quiz.interface';
import { CurrentUser } from 'src/auth/getUserDecorator';

@Injectable()
export class QuizRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;
  getQuizs() {
    const knex = this.knexConfig.instance;
    return knex.select().from('quizs');
  }
  createQuiz(quiz: IQuiz) {
    const knex = this.knexConfig.instance;
    return knex('quizs').insert(quiz);
  }
  updateQuiz(@Param() quiz_id: { quizId: string }, @Body() quiz: IQuiz) {
    const knex = this.knexConfig.instance;
    return knex('quizs').where('id', quiz_id.quizId).update(quiz);
  }
}
