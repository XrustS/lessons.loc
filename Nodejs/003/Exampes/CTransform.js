"use strict";

//----------------------------------------------------

const Transform  = require("stream").Transform;

//--------------)>

class CTransform extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push("[" + chunk.toString() + "]");
    callback();
  }
}

//--------------)>

const tr = new CTransform();

tr.on("data", console.log); // <-- (A)
tr.on("readable", function() {
  console.log("readable");

  let data;

  while(data = tr.read()) { // <-- (A): emit "data"
    console.log(data.toString());
  }
});

tr.pause();
tr.write("hello"); // <-- (A)

// > node test.js
//
// readable
// <Buffer 5b 68 65 6c 6c 6f 5d>
// [hello]