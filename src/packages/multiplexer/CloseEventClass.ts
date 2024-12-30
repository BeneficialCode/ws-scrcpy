import { Event2 } from './Event';

export class CloseEvent2 extends Event2 implements CloseEvent {
    static readonly NONE: 0 = 0;
    static readonly CLEAN: 1000 = 1000;
    
    readonly code: number;
    readonly reason: string;
    readonly wasClean: boolean;

    constructor(type: string, { code, reason }: CloseEventInit = {}) {
        super(type);
        this.code = code || 0;
        this.reason = reason || '';
        this.wasClean = this.code === 1000;
    }
}

export const CloseEventClass = typeof CloseEvent !== 'undefined' ? CloseEvent : CloseEvent2;
