import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { Tag } from 'src/tags/tags.entity';
import { TagsModule } from 'src/tags/tags.module';
import { Connection } from 'typeorm';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  imports: [DatabaseModule, TagsModule],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      provide: 'QUESTIONS_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(Question),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'TAGS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(Tag),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class QuestionsModule {}
