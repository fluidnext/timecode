/**
 * {@link https://en.wikipedia.org/wiki/Linear_timecode}
 * @class TimeCode
 */
export class TimeCode {

    /**
     * @type {number}
     */
    protected frames: number = 0;

    /**
     * @type {number}
     */
    protected seconds: number = 0;

    /**
     * @type {number}
     */
    protected minutes: number = 0;

    /**
     * @type {number}
     */
    protected hours: number = 0;

    /**
     * @type {boolean}
     */
    protected userField: Array<number> = [];

    /**
     * @type {boolean}
     */
    protected dropFrame: boolean = false;

    /**
     * @type {boolean}
     */
    protected colorFrame: boolean = false;

    /**
     * @type {boolean}
     * 27 bit
     */
    protected bitF0: boolean = false;

    /**
     * @type {boolean}
     * 58 bit unused
     */
    protected bgF1: boolean = false;

    /**
     * @type {string}
     * bit 43 and 59
     */
    protected binaryGroup: string = '00';

    /**
     *
     * @param buffer
     */
    constructor(buffer: Buffer) {

        if (buffer.length != 10) {
            return
        }

        let bit43;
        let bit59;

        /**
         * byte 0-1
         */
        let stringBit1 = ('00000000' + buffer[0].toString(2)).substr(-8);
        let stringBit2 = ('00000000' + buffer[1].toString(2)).substr(-8);

        this.userField.push(parseInt(stringBit1.substr(4), 2));
        this.userField.push(parseInt(stringBit2.substr(4), 2));

        this.frames = TimeCode.numberFromUnits(
            parseInt(stringBit2.substr(0,2), 2),
            parseInt(stringBit1.substr(0,4), 2)
        );

        this.dropFrame = !!parseInt(stringBit2.charAt(2));
        this.colorFrame = !!parseInt(stringBit2.charAt(3));

        /**
         * byte 2-3
         */
        stringBit1 = ('00000000' + buffer[2].toString(2)).substr(-8);
        stringBit2 = ('00000000' + buffer[3].toString(2)).substr(-8);

        this.userField.push(parseInt(stringBit1.substr(4), 2));
        this.userField.push(parseInt(stringBit2.substr(4), 2));

        this.seconds = TimeCode.numberFromUnits(
            parseInt(stringBit2.substr(0,3), 2),
            parseInt(stringBit1.substr(0,4), 2)
        );

        this.bitF0 = !!parseInt(stringBit2.charAt(3));

        /**
         * byte 4-5
         */
        stringBit1 = ('00000000' + buffer[4].toString(2)).substr(-8);
        stringBit2 = ('00000000' + buffer[5].toString(2)).substr(-8);

        this.userField.push(parseInt(stringBit1.substr(4), 2));
        this.userField.push(parseInt(stringBit2.substr(4), 2));

        this.minutes = TimeCode.numberFromUnits(
            parseInt(stringBit2.substr(0,3), 2),
            parseInt(stringBit1.substr(0,4), 2)
        );

        bit43 = stringBit2.charAt(3);

        /**
         * byte 4-5
         */
        stringBit1 = ('00000000' + buffer[6].toString(2)).substr(-8);
        stringBit2 = ('00000000' + buffer[7].toString(2)).substr(-8);

        this.userField.push(parseInt(stringBit1.substr(4), 2));
        this.userField.push(parseInt(stringBit2.substr(4), 2));


        this.hours = TimeCode.numberFromUnits(
            parseInt(stringBit2.substr(0,2), 2),
            parseInt(stringBit1.substr(0,4), 2)
        );

        this.bitF0 = !!parseInt(stringBit2.charAt(2));
        bit59 = stringBit2.charAt(3);

        this.binaryGroup = `${bit43}${bit59}`;
    }


    /**
     * @param tens
     * @param units
     * @return number
     */
    static numberFromUnits(tens: number, units: number) {

        return parseInt(tens + '' + units);
    }


    toString() {
        return `${('0' + this.hours).substr(-2)}:${('0' + this.minutes).substr(-2)}:${('0' + this.seconds).substr(-2)}:${('0' + this.frames).substr(-2)}`;
    }
}