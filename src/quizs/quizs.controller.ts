import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IQuiz } from './interface/quiz.interface';
import { QuizsService } from './quizs.service';
import { AuthorizationGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/getUserDecorator';

@Controller('quizs')
@UseGuards(AuthorizationGuard)
export class QuizsController {
  constructor(private quizsService: QuizsService) {}
  @Get('/all')
  async getQuizes() {
    return await this.quizsService.getQuizs();
  }
  @Post('/create')
  async createQuizes(@Body() quiz: IQuiz, @CurrentUser() id: { id: string }) {
    return await this.quizsService.createQuiz(quiz, id);
  }
  @Put('/update/:quizId')
  async updateQuiz(@Param() quiz_id: { quizId: string }, @Body() quiz: IQuiz) {
    return await this.quizsService.updateQuiz(quiz_id, quiz);
  }
}
