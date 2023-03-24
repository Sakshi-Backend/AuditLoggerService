import { Body, Controller, Get, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { AuditLog } from 'src/schemas/auditLog';
import { CreateOrUpdateLogDto } from './dto/createorupdate-log.dto';
import { CreateOrUpdateReqInterceptor } from './interceptors/createOrUpdate-request.interceptor';
import { LoggerService } from './logger.service';
import { EventPattern } from '@nestjs/microservices';
import { GetLogDto } from './dto/getLog.dto';

@Controller('auditLog')
export class LoggerController {
    constructor(private loggerService:LoggerService){}

    /**
     * API to create or update the logs
     * @params CreateOrUpdateLogDto:data to create or update log
     * @returns AuditLog
     */
    @UseInterceptors(new CreateOrUpdateReqInterceptor())
    @EventPattern('create-log')
    async createOrUpdate(log):Promise<AuditLog>{
        const auditLog = await this.loggerService.createOrUpdate(log.body);
        return auditLog
    }
    
    /**
     * API to get the changeHistory of given tableId and rowId with no of log counts
     * @param query tableId,rowId,count
     * @returns AuditLog
     */
    @Get()
    async getLog(@Query() query:GetLogDto):Promise<AuditLog>{
        const auditLog = await this.loggerService.getLog(query);
        return auditLog;
    }
}


