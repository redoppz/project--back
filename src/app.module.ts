import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, QuestionsModule, TagsModule],
})
export class AppModule {}
