import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from 'src/schemas/auditLog';
import { CreateOrUpdateLogDto } from './dto/createorupdate-log.dto';
import { GetLogDto } from './dto/getLog.dto';

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

    async getLog(query:GetLogDto):Promise<AuditLog>{
      try {
        const auditLog= await this.auditLogModel.findOne({
          tableId:query.tableId,
          rowId:query.rowId
        },{
         changeHistory:{$slice:query.count ? +query.count:5} //by default top 5 logs will be fetched
        })
        return auditLog;         
      } catch (error) {
         throw new HttpException(
            'Failed to get log',
            HttpStatus.INTERNAL_SERVER_ERROR
         )
      }
    }
}
