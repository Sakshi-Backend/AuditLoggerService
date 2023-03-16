import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLogSchema } from 'src/schemas/auditLog';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'auditLog',schema:AuditLogSchema}])],
  controllers: [LoggerController],
  providers: [LoggerService]
})
export class LoggerModule {}
