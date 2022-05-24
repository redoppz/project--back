import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Question } from 'src/questions/questions.entity';
import { Repository } from 'typeorm';
import { TagsCreateDto, TagsUpdateDto } from './dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_REPOSITORY') private tagsRepository: Repository<Tag>,
    @Inject('QUESTIONS_REPOSITORY')
    private questionsRepository: Repository<Question>,
  ) {}

  public async getTags() {
    return await this.tagsRepository.find({
      relations: ['questions'],
    });
  }

  public async getTagById(id: number) {
    const tag = await this.tagsRepository.findOne(id, {
      relations: ['questions'],
    });
    if (tag) {
      return tag;
    }
    throw new NotFoundException('Tag with this id is not found!');
  }

  public async createTag(createTagDto: TagsCreateDto) {
    const tag = await this.tagsRepository.create({
      text: createTagDto.text,
    });
    return await this.tagsRepository.save(tag);
  }

  public async updateTag(updateTagDto: TagsUpdateDto, id: number) {
    await this.tagsRepository.update(id, updateTagDto);
    const updatedTag = await this.tagsRepository.findOne(id, {
      relations: ['questions'],
    });
    if (updatedTag) {
      return updatedTag;
    }
    throw new NotFoundException('Tag with id not found');
  }

  // Доделать
  public async deleteTag(id: number) {
    try {
      const deleteTagValue = await this.getTagById(id);
      const questionWithTags = await this.questionsRepository.find({
        relations: ['tags'],
      });
      questionWithTags.map(async (question) => {
        const val = question.tags.find(
          (tag) => tag.text === deleteTagValue.text,
        );
        console.log('val', val);
        if (val) {
          const id = await this.questionsRepository.find({
            relations: ['tags'],
          });
          // await this.questionsRepository.delete();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
