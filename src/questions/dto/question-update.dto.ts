import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class QuestionUpdateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'question text', description: 'question desc' })
  text?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'answer text', description: 'answer desc ' })
  answer?: string;

  // @Transform((params) => {
  //   const { value } = params;
  //   if (Array.isArray(value)) {
  //     return value.join(', ');
  //   }
  //   return value;
  // })
  // @IsOptional()
  // @ApiProperty({ required: false })
  // public readonly tags?: string[];
}
