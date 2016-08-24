"use strict";

//----------------------------------------------------

const fs    = require("fs");
const zlib  = require("zlib");

//----------------------------------------------------

const gzip = zlib.createGzip();
const input = fs.createReadStream("data.txt");
const output = fs.createWriteStream("data.gz");

input.pipe(gzip).pipe(output);