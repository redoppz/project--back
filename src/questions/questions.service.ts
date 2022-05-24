import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/tags/tags.entity';
import { Repository } from 'typeorm';
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
    try {
      const questions = await this.questionRepository
        .createQueryBuilder('questions')
        .leftJoinAndSelect('questions.tags', 'tag');
      if (questionGetDto.text) {
        questions.andWhere('questions.text = :text', {
          text: questionGetDto.text,
        });
      }
      if (questionGetDto.answer) {
        questions.andWhere('questions.answer = :answer', {
          answer: questionGetDto.answer,
        });
      }
      if (questionGetDto.tags) {
        questions.andWhere('questions.tags IN (:...tags)', {
          tags: questionGetDto.tags,
        });
      }
      return await questions.getMany();
      // if (questions.length) {
      //   return questions;
      // }
    } catch (error) {
      console.log(error);
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

  // Refactor!
  async createQuestion(questionCreateDto: QuestionCreateDto) {
    const tagsCreated = await this.tagRepository.find(); // Нужно записать в кэш все теги

    const tags = await Promise.all(
      questionCreateDto.tags.map(async (elem) => {
        const valueOfTagsCreated = tagsCreated.find((el) => el.text === elem);

        let tag: Tag;
        if (valueOfTagsCreated) {
          tag = valueOfTagsCreated;
        } else {
          tag = new Tag();
          tag.text = elem;
          tag = await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    try {
      const question = this.questionRepository.create({
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

  // Refactor!
  async updateQuestion(id: string, questionUpdateDto: QuestionUpdateDto) {
    const updatedQuestion = await this.questionRepository.findOne(id, {
      relations: ['tags'],
    });
    if (questionUpdateDto.tags) {
      const tagsUpdated = await this.tagRepository.find();
      const tags = await Promise.all(
        questionUpdateDto.tags.map(async (elem) => {
          const tagContainInQuestion = tagsUpdated.find(
            (el) => el.text === elem,
          );
          let tag: Tag;
          if (tagContainInQuestion) {
            tag = tagContainInQuestion;
          } else {
            tag = new Tag();
            tag.text = elem;
            tag = await this.tagRepository.save(tag);
          }
          return tag;
        }),
      );
      updatedQuestion.tags = tags;
    }
    if (questionUpdateDto.text) {
      updatedQuestion.text = questionUpdateDto.text;
    }
    if (questionUpdateDto.answer) {
      updatedQuestion.answer = questionUpdateDto.answer;
    }
    try {
      return await this.questionRepository.save(updatedQuestion);
    } catch (error) {
      console.log(error);
    }
  }
}
