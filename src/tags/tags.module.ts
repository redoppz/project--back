import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { Question } from 'src/questions/questions.entity';
import { Connection } from 'typeorm';
import { TagsController } from './tags.controller';
import { Tag } from './tags.entity';
import { TagsService } from './tags.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [
    TagsService,
    {
      provide: 'TAGS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(Tag),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'QUESTIONS_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(Question),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class TagsModule {}
