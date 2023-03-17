import { IsNotEmpty } from "class-validator";
import { ChangeHistoryDto } from "./changeHistory.dto";

export class CreateOrUpdateLogDto{
    
    @IsNotEmpty()
    tableId:number;
    
    @IsNotEmpty()
    rowId:string;
    
    @IsNotEmpty()
    changeHistory:ChangeHistoryDto

}