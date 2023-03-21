import { IsNotEmpty, IsOptional } from "class-validator";

export class GetLogDto{
    @IsNotEmpty()
    tableId:number;

    @IsNotEmpty()
    rowId:string;

    @IsOptional()
    count:number;
}