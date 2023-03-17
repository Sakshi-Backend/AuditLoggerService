import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ChangeHistory } from "./changedHistory";

export type AuditLogDocument = HydratedDocument<AuditLog>

@Schema({timestamps:true})
export class AuditLog{

   @Prop({required:true})
   tableId:number
   
   @Prop({required:true})
   rowId:string
   
   @Prop()
   changeHistory:ChangeHistory[]
   
   @Prop()
   createdAt:Date
   
   @Prop()
   updatedAt:Date
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog)