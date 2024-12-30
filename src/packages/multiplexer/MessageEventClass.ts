import { Event2 } from './Event';

export class MessageEvent2<T = any> extends Event2 implements MessageEvent<T> {
    static readonly NONE: 0 = 0;
    
    readonly data: T;
    readonly origin: string;
    readonly lastEventId: string;
    readonly source: MessageEventSource | null;
    readonly ports: ReadonlyArray<MessagePort>;

    constructor(type: string, init: MessageEventInit<T> = {}) {
        super(type);
        // Cast undefined to T to handle the case where data is not provided
        this.data = (init.data === undefined ? null : init.data) as T;
        this.origin = init.origin || '';
        this.lastEventId = init.lastEventId || '';
        this.source = init.source || null;
        this.ports = init.ports ? Array.from(init.ports) : [];
    }

    initMessageEvent(
        type: string,
        bubbles?: boolean,
        cancelable?: boolean,
        data?: any,
        origin?: string,
        lastEventId?: string,
        source?: MessageEventSource | null,
        ports?: MessagePort[]
    ): void {
        this.type = type;
        if (bubbles !== undefined) this.bubbles = bubbles;
        if (cancelable !== undefined) this.cancelable = cancelable;
        if (data !== undefined) (this as any).data = data;
        if (origin !== undefined) (this as any).origin = origin;
        if (lastEventId !== undefined) (this as any).lastEventId = lastEventId;
        if (source !== undefined) (this as any).source = source;
        if (ports !== undefined) (this as any).ports = ports;
    }
}

export const MessageEventClass = typeof MessageEvent !== 'undefined' ? MessageEvent : MessageEvent2;
