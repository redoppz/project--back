import { IsOptional, IsString } from 'class-validator';

export class QuestionUpdateDto {

	@IsOptional()
	@IsString()
	text?: string;

	@IsOptional()
	@IsString()
	answer?: string;
}
