import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuditLog } from 'src/schemas/auditLog';
import { CreateOrUpdateLogDto } from './dto/createorupdate-log.dto';
import { CreateOrUpdateReqInterceptor } from './interceptors/createOrUpdate-request.interceptor';
import { LoggerService } from './logger.service';

@Controller('auditLog')
export class LoggerController {
    constructor(private loggerService:LoggerService){}
    
    /**
     * API to create or update the logs
     * @params CreateOrUpdateLogDto contains data to create or update log
     */
    @UseInterceptors(new CreateOrUpdateReqInterceptor())
    @Post()
    async createOrUpdate(@Body() log:CreateOrUpdateLogDto):Promise<AuditLog>{
        try{
          const auditLog = await this.loggerService.createOrUpdate(log);
          return auditLog
        }catch(err){
            throw err;
        }
    }
}
