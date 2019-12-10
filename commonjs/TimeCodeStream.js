"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const TimeCode_1 = require("./TimeCode");
/**
 * @class TimecodeStream
 */
class TimeCodeStream extends stream_1.Transform {
    constructor() {
        super(...arguments);
        this.tmpBuffer = Buffer.from([]);
        /**
         * @param chunk
         * @param encoding
         * @param done
         * @private
         */
        this._transform = function (chunk, encoding, done) {
            this.tmpBuffer = Buffer.concat([this.tmpBuffer, chunk]);
            let timecodeBuffer;
            let timecode;
            while (this.tmpBuffer.length >= 10) {
                timecodeBuffer = this.tmpBuffer.slice(0, 10);
                if (TimeCodeStream.isValidStream(timecodeBuffer)) {
                    timecode = new TimeCode_1.TimeCode(timecodeBuffer);
                    // TODO add drop frame?
                    this.push(timecodeBuffer);
                    this.tmpBuffer = this.tmpBuffer.slice(10);
                }
                else {
                    this.tmpBuffer = this.tmpBuffer.slice(1);
                }
            }
            done();
        };
    }
    /**
     * @param buffer
     * @return {boolean}
     */
    static isValidStream(buffer) {
        return buffer.length === 10 && buffer[8] == TimeCodeStream.BYTES_END[0] && buffer[9] == TimeCodeStream.BYTES_END[1];
    }
}
exports.TimeCodeStream = TimeCodeStream;
/**
 * {@link https://en.wikipedia.org/wiki/Linear_timecode}
 * 2 byte of end protocol 0011 1111, 1111 1101
 */
TimeCodeStream.BYTES_END = [
    0x3f,
    0xfd
];
