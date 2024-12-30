import { Event2 } from './Event';

export class ErrorEvent2 extends Event2 implements ErrorEvent {
    static readonly NONE: 0 = 0;
    
    readonly error: any;
    readonly message: string;
    readonly filename: string;
    readonly lineno: number;
    readonly colno: number;

    constructor(type: string, { error, message, filename, lineno, colno }: ErrorEventInit = {}) {
        super(type);
        this.error = error;
        this.message = message || '';
        this.filename = filename || '';
        this.lineno = lineno || 0;
        this.colno = colno || 0;
    }
}

export const ErrorEventClass = typeof ErrorEvent !== 'undefined' ? ErrorEvent : ErrorEvent2;
