"use strict";

//----------------------------------------------------

const Writable  = require("stream").Writable;

//--------------)>

class CWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, done) {
    console.log("_write");
    console.log(chunk.toString());
    done();
  }
}

let tt = new CWritable();

tt.write("START");
tt.cork();
tt.write("1");
tt.write("2");

setTimeout(function() {
  //tt.uncork();
  tt.end("DONE");
}, 1000 * 2);