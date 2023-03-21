import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from 'src/schemas/auditLog';
import { CreateOrUpdateLogDto } from './dto/createorupdate-log.dto';

@Injectable()
export class LoggerService {
    constructor(@InjectModel('auditLog') private auditLogModel:Model<AuditLogDocument>){}

    async createOrUpdate(log:CreateOrUpdateLogDto):Promise<AuditLog>{
     try{
        const auditLog = await this.auditLogModel.findOneAndUpdate({
            tableId:log.tableId,
            rowId:log.rowId
         },{
            $push:{
                changeHistory:log.changeHistory
            }
         },{
            upsert:true, //create if doesn't exist
            new:true   //return the modified
         }).exec();
         return auditLog;    
     }catch(error){
        throw new HttpException(
         'Failed to create or update logger',
         HttpStatus.INTERNAL_SERVER_ERROR,
       );
     }
    }
}
