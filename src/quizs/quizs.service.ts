import { Body, Injectable, Param } from '@nestjs/common';
import { IQuiz } from './interface/quiz.interface';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizsService {
  constructor(private quizRepository: QuizRepository) {}
  async getQuizs() {
    return await this.quizRepository.getQuizs();
  }
  async createQuiz(quiz: IQuiz, id: { id: string }) {
    quiz['owner'] = id.id;

    await this.quizRepository.createQuiz(quiz);
    return {
      message: 'Quiz successfully created',
    };
  }
  async updateQuiz(@Param() quiz_id: { quizId: string }, @Body() quiz: IQuiz) {
    await this.quizRepository.updateQuiz(quiz_id, quiz);
    return {
      message: 'Quiz successfully updated',
    };
  }
}
