"use strict";

//----------------------------------------------------

const Readable  = require("stream").Readable;

//--------------)>

class CReadable extends Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    this.push(size.toString());
    this.push(null);
  }
}

//--------------)>

const read = new CReadable();

read.on("data", console.log); // <-- (A)
read.on("readable", function() {
  let data;

  while(data = read.read()) { // <-- (A): emit "data"
    console.log(data.toString());
  }
});

read.pause(); // <-- (A)

// > node test.js
//
// readable
// <Buffer 31 36 33 38 34>
// "16384"