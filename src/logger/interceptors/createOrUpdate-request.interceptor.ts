import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { LogDiff } from "../helper/utility";

@Injectable()
export class CreateOrUpdateReqInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
         const req=context.switchToHttp().getRequest();
         const data=req;
         const result={
            tableId:data.tableId,
            rowId:data.rowId,
            changeHistory:{}
        }
        if(data.ipAddress) result.changeHistory['ipAddress']=data.ipAddress;
        if(data.miscellaneous) result.changeHistory['miscellaneous']=data.miscellaneous;
        if(data.userId) result.changeHistory['userId']=data.userId;
        if(data.action) result.changeHistory['action']=data.action;
        result.changeHistory['log']= LogDiff.calculateDiff(data.oldData,data.newData)
         req.body=result;
         return next.handle();
    }
}