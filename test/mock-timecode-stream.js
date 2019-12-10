let timecode = Buffer.from(
    [
        5, 6, 9, 8,
        0, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x10, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x20, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x30, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x40, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x50, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x60, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x70, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x80, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0x90, 0, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
        0, 0x40, 0, 0, 0, 0, 0, 0, 0x3f, 0xfd,
    ]
);

const fs = require('fs');
fs.writeFileSync('test/test-timecode.txt', timecode);