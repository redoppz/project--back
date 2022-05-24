import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class QuestionCreateDto {
  @IsString()
  @ApiProperty({ example: 'question text', description: 'question desc' })
  text: string;

  @IsString()
  @ApiProperty({ example: 'answer text', description: 'answer desc ' })
  answer: string;

  @ApiProperty({ default: [], description: 'question tags' })
  tags: string[];
}
