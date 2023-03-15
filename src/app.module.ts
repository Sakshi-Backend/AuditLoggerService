import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    //Initialize config module for accepting .env file
    ConfigModule.forRoot(),
    //Initialize Database
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
