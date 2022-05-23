import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/tags/tags.entity';
import { Repository, TableExclusion } from 'typeorm';
import { QuestionCreateDto, QuestionGetDto, QuestionUpdateDto } from './dto';
import { Question } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QUESTIONS_REPOSITORY')
    private questionRepository: Repository<Question>,
    @Inject('TAGS_REPOSITORY')
    private tagRepository: Repository<Tag>,
  ) {}

  async listQuestions(questionGetDto: QuestionGetDto) {
    const questions = await this.questionRepository.find({
      relations: ['tags'],
      where: questionGetDto,
    });
    if (questions.length) {
      return questions;
    }
    throw new NotFoundException('Questions with these query params not found!');
  }

  async getQuestion(id: string) {
    const question = await this.questionRepository.findOne(id, {
      relations: ['tags'],
    });
    if (question) {
      return question;
    }
    throw new NotFoundException('Question with this id not found!');
  }

  // Костыль - необходимо отрефакторить
  async createQuestion(questionCreateDto: QuestionCreateDto) {
    const tags: Tag[] = await Promise.all(
      questionCreateDto.tags.map(async (elem) => {
        const tagsCreated = await this.tagRepository.find();
        const valueOfTagsCreated = await tagsCreated.map((elem) => elem.text);
        let tag: Tag;
        if (valueOfTagsCreated.includes(elem)) {
          tag.text = elem;
        } else {
          tag = new Tag(elem);
        }
        return tag;
      }),
    );

    try {
      const question = await this.questionRepository.create({
        text: questionCreateDto.text,
        answer: questionCreateDto.answer,
        tags,
      });
      return await this.questionRepository.save(question);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteQuestion(id: string) {
    return await this.questionRepository.delete(id);
  }

  // Отрефакторить
  async updateQuestion(id: string, questionUpdateDto: QuestionUpdateDto) {
    await this.questionRepository.update(id, questionUpdateDto);
    const updatedQuestion = this.questionRepository.findOne(id, {
      relations: ['tags'],
    });
    if (updatedQuestion) {
      return updatedQuestion;
    }
    throw new NotFoundException('Question with this id not found!');
  }
}
