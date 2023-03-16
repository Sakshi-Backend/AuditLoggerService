import { IsNotEmpty, IsOptional } from "class-validator"
import { MiscellaneousDto } from "./miscellaneous.dto"

export class ChangeHistoryDto{
    @IsNotEmpty()
    action:string
    
    @IsNotEmpty()
    log:object
    
    @IsNotEmpty()
    user:object
    
    @IsOptional()
    ipAddress:string
    
    @IsOptional()
    miscellaneous:MiscellaneousDto
}