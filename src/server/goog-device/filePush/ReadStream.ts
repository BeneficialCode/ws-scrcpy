import { Readable, ReadableOptions } from 'stream';

type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';

export class ReadStream extends Readable {
    private _bytesRead = 0;
    public pending = false;
    
    constructor(private readonly _path: string, opts?: ReadableOptions) {
        super(opts);
    }
    
    public get bytesRead(): number {
        return this._bytesRead;
    }
    
    public get path(): string | Buffer {
        return this._path;
    }
    
    public push(chunk: any, encoding?: BufferEncoding): boolean {
        if (chunk) {
            this._bytesRead += chunk.length;
        }
        return super.push(chunk, encoding);
    }

    public close(): void {
        this.destroy();
    }
}
