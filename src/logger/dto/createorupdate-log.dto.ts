import { IsNotEmpty, IsOptional } from "class-validator";
import { ChangeHistoryDto } from "./changeHistory.dto";

export class CreateOrUpdateLogDto{
    
    @IsNotEmpty()
    tableId:number;
    
    @IsNotEmpty()
    rowId:number;
    
    @IsNotEmpty()
    changeHistory:ChangeHistoryDto

}