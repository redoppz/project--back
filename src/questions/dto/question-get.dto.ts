import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QuestionGetDto {
  @ApiProperty({ required: false })
  @IsOptional()
  public readonly text?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  public readonly answer?: string;

  @Transform((params) => {
    const { value } = params;
    if (Array.isArray(value)) {
      return value.join(',');
    }
    return value;
  })
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly tags?: string[];
}
