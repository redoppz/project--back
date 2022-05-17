import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [UsersModule, QuestionsModule],
})
export class AppModule {}
