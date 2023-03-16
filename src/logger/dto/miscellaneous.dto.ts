import { IsNotEmpty } from "class-validator";

export class MiscellaneousDto{
    @IsNotEmpty()
    platform: string;

    @IsNotEmpty()
    os:string;
}