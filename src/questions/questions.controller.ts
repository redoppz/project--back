import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionCreateDto, QuestionGetDto, QuestionUpdateDto } from './dto';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, type: [Question] })
  @Get()
  listQuestions(@Query() questionGetDto: QuestionGetDto) {
    console.log(questionGetDto);
    return this.questionsService.listQuestions(questionGetDto);
  }

  @ApiOperation({ summary: 'Get a question by id' })
  @ApiResponse({ status: 200, type: Question })
  @Get(':id')
  getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestion(id);
  }

  @ApiOperation({ summary: 'Create a question' })
  @ApiResponse({ status: 201, type: Question })
  @Post()
  createQuestion(@Body() questionCreateDto: QuestionCreateDto) {
    return this.questionsService.createQuestion(questionCreateDto);
  }

  @ApiOperation({ summary: 'Delete a question by id' })
  @ApiResponse({ status: 204, type: String })
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    await this.questionsService.deleteQuestion(id);
  }

  @ApiOperation({ summary: 'Update a question by id' })
  @ApiResponse({ status: 204, type: Question })
  @Put(':id')
  updateQuestion(
    @Param('id') id: string,
    @Body() questionUpdateDto: QuestionUpdateDto,
  ) {
    return this.questionsService.updateQuestion(id, questionUpdateDto);
  }
}
