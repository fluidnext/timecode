/// <reference types="node" />
import { Transform } from "stream";
/**
 * @class TimecodeStream
 */
export declare class TimeCodeStream extends Transform {
    /**
     * {@link https://en.wikipedia.org/wiki/Linear_timecode}
     * 2 byte of end protocol 0011 1111, 1111 1101
     */
    static BYTES_END: number[];
    protected tmpBuffer: Buffer;
    /**
     * @param chunk
     * @param encoding
     * @param done
     * @private
     */
    _transform: (chunk: any, encoding: any, done: any) => void;
    /**
     * @param buffer
     * @return {boolean}
     */
    static isValidStream(buffer: Buffer): boolean;
}
