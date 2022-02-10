import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { Connection } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(User),
      inject: ['DATABASE_CONNECTION'],
    },
    UsersService
  ],
})
export class UsersModule {}
