import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuditLog } from 'src/schemas/auditLog';
import { CreateOrUpdateLogDto } from './dto/createorupdate-log.dto';
import { CreateOrUpdateReqInterceptor } from './interceptors/createOrUpdate-request.interceptor';
import { LoggerService } from './logger.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('auditLog')
export class LoggerController {
    constructor(private loggerService:LoggerService){}

    /**
     * API to create or update the logs
     * @params CreateOrUpdateLogDto contains data to create or update log
     */
    @UseInterceptors(new CreateOrUpdateReqInterceptor())
    @EventPattern('create-log')
    async createOrUpdate(log):Promise<AuditLog>{
        const auditLog = await this.loggerService.createOrUpdate(log.body);
        return auditLog
    }
}


