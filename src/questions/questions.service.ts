import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionCreateDto } from './dto/question-create.dto';
import { QuestionUpdateDto } from './dto/question-update.dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {

	constructor(
		@Inject('QUESTIONS_REPOSITORY')
		private questionRepository: Repository<Question>
	) {}

	async listQuestions() {
		return this.questionRepository.find();
	}

	async getQuestion(id: string) {
		return this.questionRepository.findOne(id);
	}

	async createQuestion(questionCreateDto: QuestionCreateDto) {
		const question = this.questionRepository.create({
			text: questionCreateDto.text,
			answer: questionCreateDto.answer
		});
		return this.questionRepository.save(question);
	}

	async deleteQuestion(id: string) {
		return this.questionRepository.delete(id);
	}

	async updateQuestion(id: string, questionUpdateDto: QuestionUpdateDto) {
		const question = await this.questionRepository.findOne(id);
		Object.assign(question, questionUpdateDto);
		return this.questionRepository.save(question);
	}
}
