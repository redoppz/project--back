import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { Connection } from 'typeorm';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      provide: 'QUESTIONS_REPOSITORY',
      useFactory: (connection: Connection) =>
        connection.getRepository(Question),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class QuestionsModule {}
