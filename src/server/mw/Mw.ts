import { Message } from '../../types/Message';
import * as http from 'http';
import { Multiplexer } from '../../packages/multiplexer/Multiplexer';
import WS from 'ws';

export type RequestParameters = {
    request: http.IncomingMessage;
    url: URL;
    action: string;
};

export interface MwFactory {
    processRequest(ws: WS, params: RequestParameters): Mw | undefined;
    processChannel(ws: Multiplexer, code: string, data?: ArrayBuffer): Mw | undefined;
}

export abstract class Mw {
    protected name = 'Mw';

    public static processChannel(_ws: Multiplexer, _code: string, _data?: ArrayBuffer): Mw | undefined {
        return;
    }

    public static processRequest(_ws: WS, _params: RequestParameters): Mw | undefined {
        return;
    }

    protected constructor(protected readonly ws: WS | Multiplexer) {
        if (ws instanceof Multiplexer) {
            ws.on('message', (event: any) => this.onSocketMessage(event));
            ws.on('close', () => this.onSocketClose());
        } else {
            ws.on('message', (data: any) => this.onSocketMessage({ data } as WS.MessageEvent));
            ws.on('close', () => this.onSocketClose());
        }
    }

    protected abstract onSocketMessage(event: WS.MessageEvent): void;

    protected onSocketClose(): void {
        this.release();
    }

    protected sendMessage = (data: Message): void => {
        if (this.ws.readyState !== this.ws.OPEN) {
            return;
        }
        this.ws.send(JSON.stringify(data));
    };

    public release(): void {
        const { readyState, CLOSED, CLOSING } = this.ws;
        if (readyState !== CLOSED && readyState !== CLOSING) {
            this.ws.close();
        }
    }
}
