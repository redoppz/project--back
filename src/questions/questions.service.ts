import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { QuestionCreateDto, QuestionGetDto, QuestionUpdateDto } from './dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTIONS_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  async listQuestions(questionGetDto: QuestionGetDto) {
    console.log(questionGetDto);
    // return await this.questionRepository.find(questionGetDto);
    return await this.questionRepository.find({
      where: {
        tags: ['sql'],
      },
    });
  }

  async getQuestion(id: string) {
    return await this.questionRepository.findOne(id);
  }

  async createQuestion(questionCreateDto: QuestionCreateDto) {
    const question = await this.questionRepository.create({
      text: questionCreateDto.text,
      answer: questionCreateDto.answer,
      tags: questionCreateDto.tags,
    });
    return await this.questionRepository.save(question);
  }

  async deleteQuestion(id: string) {
    return await this.questionRepository.delete(id);
  }

  async updateQuestion(id: string, questionUpdateDto: QuestionUpdateDto) {
    const question = await this.questionRepository.findOne(id);
    Object.assign(question, questionUpdateDto);
    return await this.questionRepository.save(question);
  }
}
