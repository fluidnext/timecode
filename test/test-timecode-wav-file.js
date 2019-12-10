const fs = require('fs');
let readStream = fs.createReadStream(__dirname + '/timecode.wav');

timecodeStream = new (require('../commonjs/TimeCodeStream').TimeCodeStream)();
readStream.pipe(timecodeStream);

let timecodeObj;

timecodeStream.on('data', function (data) {

    timecodeObj = new (require('../commonjs/TimeCode').TimeCode)(data);
    console.log('TIME CODE BUFFER', data);
    console.log('TIME CODE STRING', timecodeObj.toString());

});


/*
const { createCanvas } = require('canvas');
const canvas = createCanvas(1200, 600);
const context = canvas.getContext('2d');

let readStream = fs.createReadStream(__dirname + '/test-timecode.txt');
let buffer = fs.readFileSync(__dirname + '/timecode.wav');

let object = {
    chunkId: buffer.slice(0, 4).toString(),
    chunkSize: getLittleEndianIntegerFromByteArray(buffer.slice(4, 8)),
    format: buffer.slice(8, 12).toString(),
    subChunk1Id: buffer.slice(12, 16).toString(),
    subChunk1Size: getLittleEndianIntegerFromByteArray(buffer.slice(16, 20)),
    audioFormat: getLittleEndianIntegerFromByteArray(buffer.slice(20, 22)),
    numChannels: getLittleEndianIntegerFromByteArray(buffer.slice(22, 24)),
    sampleRate: getLittleEndianIntegerFromByteArray(buffer.slice(24, 28)),
    byteRate: getLittleEndianIntegerFromByteArray(buffer.slice(28, 32)),
    blockAlign: getLittleEndianIntegerFromByteArray(buffer.slice(32, 34)),
    bitsPerSample: getLittleEndianIntegerFromByteArray(buffer.slice(34, 36)),
    subChunk2Id: buffer.slice(36, 40).toString(),
    subChunk2Size: getLittleEndianIntegerFromByteArray(buffer.slice(40, 44)),
    data: buffer.slice(44)
};

for (let key in object) {
    if (key !== 'data') {
        console.log(key, object[key], object[key].toString());
    } else {
        console.log(key, object[key].length + 36);
    }

}

function getLittleEndianIntegerFromByteArray(data) {
    return (data[0 + 3] << 24)
        | (data[0 + 2] << 16)
        | (data[0 + 1] << 8)
        | data[0];
}


let scale = 1024 / 255;


timecodeStream = new (require('../commonjs/TimeCodeStream').TimeCodeStream)();
readStream.pipe(timecodeStream);

timecodeStream.on('data', function (data) {
    // This just pipes the read stream to the response object (which goes to the client)
    //readStream.pipe(res);


    console.log('TIME CODE', data)
});

readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    //readStream.pipe(res);


    console.log('open file')
});

/*
context.beginPath();
context.moveTo(0, 0);
for (let i = 0; i < 300; i += 1) {
    context.lineTo(i, object.data[i] * scale);
    console.log(object.data[i]);
}

context.strokeStyle = "red";
context.stroke();

let buf = canvas.toBuffer();
fs.writeFileSync("test/timecode.png", buf);

 */

