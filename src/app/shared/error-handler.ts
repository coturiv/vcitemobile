import { ErrorHandler as BaseErrorHandler, Injectable } from "@angular/core";
import { CommonService } from "../services/common.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler extends BaseErrorHandler {

    constructor(private commonService: CommonService) {
        super();
    }

    handleError(error: Error | any) {
        console.log(error);
        // this.commonService.showNotify(error.message, 'error');
    }
}
