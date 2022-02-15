import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionCreateDto {

	@IsString()
	@ApiProperty()
	text: string;

	@IsString()
	@ApiProperty()
	answer: string;
}
