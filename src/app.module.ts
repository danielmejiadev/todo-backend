// Dependencies
import { Module } from '@nestjs/common';

// Modules
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

/**
 * Module for initialize app modules avaiable.
 * @author Daniel Mejia
 */
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
