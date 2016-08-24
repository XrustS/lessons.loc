"use strict";

//----------------------------------------------------

const fs          = require("fs");

const Readable    = require("stream").Readable;
const Transform   = require("stream").Transform;

//----------------------------------------------------

const C_DATA_DIV    = "-----D-KEY------";

//----------------------------------------------------


class CGeneratorOfGoodIdeas extends Readable {
  constructor(options) {
    super(options);
  }

  _read() {
    const ideas = "Покушать,Поспать,Дота,Работа,Доширак".split(",");

    for(let i = 1, max = 6; i <= max; i++) {
      this.push(i % max === 0 ? null :
                  gen() + ((i + 1) < max ? C_DATA_DIV : ""));
    }

    function gen() {
      const idx = Math.round(-0.5 + Math.random() * ideas.length);
      return ideas[idx];
    }
  }
}

class CBrainManager extends Transform {
  constructor(options = {}) {
    options.objectMode = true;

    super(options);

    this.chunks = [];
  }

  _transform(chunk, encoding, done) {
    this.chunks.push(chunk);
    done();
  }

  _flush(done) {
    Buffer
        .concat(this.chunks)
        .toString()
        .split(C_DATA_DIV)
        .forEach(e => {
          this.push({"name": e});
        });

    this.chunks = [];
    done();
  }
}

class CLimit extends Transform {
  constructor(max, options = {}) {
    options.objectMode = true;

    super(options);

    this.countMax = max;
    this.count = 0;
  }

  _transform(chunk, encoding, done) {
    if(this.count < this.countMax) {
      this.count++;
      this.push(chunk);
    }

    done();
  }

  _flush(done) {
    this.count = 0;
    done();
  }
}

class CStringify extends Transform {
  constructor(options = {}) {
    options.objectMode = true;

    super(options);
  }

  _transform(chunk, encoding, done) {
    done(null, JSON.stringify(chunk));
  }
}

//----------------------------------------------------

(new CGeneratorOfGoodIdeas())
    .pipe(new CBrainManager({"highWaterMark": 1}))
    .pipe(new CLimit(3))
    .pipe(new CStringify())
    .pipe(process.stdout)
