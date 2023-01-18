import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule, DebtsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
