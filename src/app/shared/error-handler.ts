import { ErrorHandler as BaseErrorHandler, Injectable } from '@angular/core';
import { NotifyService } from 'ionic4-kits';

const appErrors = {
    'AUTH_NOT_REGISTERED': '',
    'AUTH_WRONG_PASSWORD': '',
    'QRSCAN_INVALID_CODE': '',
    'FILE_CREATE_FAILED': '',
    'FILE_UPLOAD_FAILED': '',
    'FILE_NOT_EXISTS': '',
    'DB_CONNECT_FAILED': '',
    'DB_CREATE_FAILED': '',
    'DB_DROP_FAILED': '',
    'DB_ENTITY_REMOVE_FAILED': '',
    'DB_ENTITY_INSERT_FAILED': '',
    'DB_ENTITY_UPDATE_FAILED': '',
    'DB_ENTITY_READ_FAILED': '',
    'HTTP_ERROR_404': '',
    'HTTP_ERROR_500': '',
    'PLATFORM_NOT_READY': '',
};

type AppError = keyof typeof appErrors;

export function throwAppError(error: AppError) {
    throw error;
}

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler extends BaseErrorHandler {

    constructor(private notifyService: NotifyService) {
        super();
    }

    handleError(error: Error | AppError | any) {
        error = error.rejection || error;

        this.notifyService.showNotify(JSON.stringify(error), 'error');
        console.log(error);
        if (error instanceof Error) {
        } else if (appErrors[error]) {
            this.notifyService.showNotify(appErrors[error], 'error');
        }
    }
}
