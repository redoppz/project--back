import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionCreateDto } from './dto/question-create.dto';
import { QuestionUpdateDto } from './dto/question-update.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

	constructor (private readonly questionsService: QuestionsService) {}

	@Get('/list')
	listQuestions() {
		return this.questionsService.listQuestions();
	}

	@Get(':id')
	getQuestion (@Param('id') id: string) {
		return this.questionsService.getQuestion(id);
	}

	@Post('/create')
	createQuestion(@Body() questionCreateDto: QuestionCreateDto) {
		return this.questionsService.createQuestion(questionCreateDto);
	}

	@Delete(':id')
	async deleteQuestion(@Param('id') id: string) {
		await this.questionsService.deleteQuestion(id);
	}

	@Put(':id')
	updateQuestion(@Param('id') id: string, @Body() questionUpdateDto: QuestionUpdateDto) {
		return this.questionsService.updateQuestion(id, questionUpdateDto);
	}
}
