"use strict";

//----------------------------------------------------

const fs    = require("fs");

//----------------------------------------------------

// 1. Not all Readable/Writable streams will emit the 'close' event.
// 2. The 'end' event will not be emitted unless the data is completely consumed.
// 3. The 'readable' event will also be emitted once the end of the stream data has been reached but before the 'end' event is emitted.
// 4. The readable.pipe() and 'data' event mechanisms are preferred over the use of the 'readable' event.
// 5. The 'error' event may be emitted by a Readable implementation at any time.
// 6. The stream is not closed when the 'error' event is emitted.
// 7. The readable.pause() method will cause a stream in flowing mode to stop emitting 'data' events, switching out of flowing mode.

test1();
test2();
test3();

//----------------------------------------------------

function test1() {
    const input = fs.createReadStream("+!#$%^*");
    const output = fs.createWriteStream("+!#$%^*");

    //-----]>

    input.on("error", e => console.log("[1] error | createReadStream"));
    output.on("error", e => console.log("[1] error | createWriteStream"));

    input.on("end", e => console.log("[1] end | createReadStream"));
    output.on("finish", e => console.log("[1] finish | createWriteStream"));

    input.on("close", e => console.log("[1] close | createReadStream"));
    output.on("close", e => console.log("[1] close | createWriteStream"));
}

function test2() {
    const input = fs.createReadStream("data.txt");
    const output = fs.createWriteStream("copy.txt");

    //-----]>

    input.pipe(output);

    //-----]>

    input.on("error", e => console.log("[2] error | createReadStream"));
    output.on("error", e => console.log("[2] error | createWriteStream"));

    input.on("end", e => console.log("[2] end | createReadStream"));
    output.on("finish", e => console.log("[2] finish | createWriteStream"));

    input.on("close", e => console.log("[2] close | createReadStream"));
    output.on("close", e => console.log("[2] close | createWriteStream"));
}

function test3() {
    const input = fs.createReadStream("data.txt");
    const output = fs.createWriteStream("copy.txt");

    //-----]>

    input.pipe(output);
    input.pause();

    //-----]>

    input.on("error", e => console.log("[3] error | createReadStream"));
    output.on("error", e => console.log("[3] error | createWriteStream"));

    input.on("end", e => console.log("[3] end | createReadStream"));
    output.on("finish", e => console.log("[3] finish | createWriteStream"));

    input.on("close", e => console.log("[3] close | createReadStream"));
    output.on("close", e => console.log("[3] close | createWriteStream"));
}
