import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChangeHistoryDocument = HydratedDocument<ChangeHistory>

@Schema()
export class ChangeHistory{
    @Prop()
    action:string

    @Prop({required:true,default:()=>{return new Date()}})
    created:Date;

    @Prop()
    log:object
    
    @Prop()
    user:object
    
    @Prop()
    ipAddress:string
    
    @Prop()
    miscellaneous:object
}

export const ChangeHistorySchema = SchemaFactory.createForClass(ChangeHistory);