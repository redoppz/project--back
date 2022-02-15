import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QuestionUpdateDto {

	@IsOptional()
	@IsString()
	@ApiProperty()
	text?: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	answer?: string;
}
