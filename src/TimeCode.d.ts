/// <reference types="node" />
/**
 * {@link https://en.wikipedia.org/wiki/Linear_timecode}
 * @class TimeCode
 */
export declare class TimeCode {
    /**
     * @type {number}
     */
    protected frames: number;
    /**
     * @type {number}
     */
    protected seconds: number;
    /**
     * @type {number}
     */
    protected minutes: number;
    /**
     * @type {number}
     */
    protected hours: number;
    /**
     * @type {boolean}
     */
    protected userField: Array<number>;
    /**
     * @type {boolean}
     */
    protected dropFrame: boolean;
    /**
     * @type {boolean}
     */
    protected colorFrame: boolean;
    /**
     * @type {boolean}
     * 27 bit
     */
    protected bitF0: boolean;
    /**
     * @type {boolean}
     * 58 bit unused
     */
    protected bgF1: boolean;
    /**
     * @type {string}
     * bit 43 and 59
     */
    protected binaryGroup: string;
    /**
     *
     * @param buffer
     */
    constructor(buffer: Buffer);
    /**
     * @param tens
     * @param units
     * @return number
     */
    static numberFromUnits(tens: number, units: number): number;
    toString(): string;
}
