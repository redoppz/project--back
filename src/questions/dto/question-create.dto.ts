import { IsString } from 'class-validator';

export class QuestionCreateDto {

	@IsString()
	text: string;

	@IsString()
	answer: string;
}
