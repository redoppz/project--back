import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsCreateDto, TagsUpdateDto } from './dto';
import { Tag } from './tags.entity';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, type: [Tag] })
  @Get()
  getTags() {
    return this.tagsService.getTags();
  }

  @ApiOperation({ summary: 'Get a tag by id' })
  @ApiResponse({ status: 200, type: Tag })
  @Get(':id')
  getTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @ApiOperation({ summary: 'Create a tag' })
  @ApiResponse({ status: 201, type: Tag })
  @Post()
  createTag(@Body() createTagDto: TagsCreateDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({ status: 201, type: Tag })
  @Put(':id')
  updateTag(
    @Body() updateTagDto: TagsUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tagsService.updateTag(updateTagDto, id);
  }

  @ApiOperation({ summary: 'Delete a tag' })
  @ApiResponse({ status: 204, type: String })
  @Delete(':id')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }
}
