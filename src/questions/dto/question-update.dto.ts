import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QuestionUpdateDto {

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'question text', description: 'question desc' })
	text?: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'answer text', description: 'answer desc ' })
	answer?: string;
}
