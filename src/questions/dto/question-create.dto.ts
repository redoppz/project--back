import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QuestionCreateDto {
  @IsString()
  @ApiProperty({ example: 'question text', description: 'question desc' })
  text: string;

  @IsString()
  @ApiProperty({ example: 'answer text', description: 'answer desc ' })
  answer: string;

  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join(',');
    }
    return value;
  })
  @ApiProperty({ default: [], description: 'question tags' })
  tags: string[];
}
