"use strict";

//----------------------------------------------------

const fs    = require("fs");
const zlib  = require("zlib");
const http  = require("http");

//----------------------------------------------------

const gzip  = zlib.createGzip();

//----------------------------------------------------

http
    .createServer(function(req, res) {
        fs
            .createReadStream(__dirname + "/data.txt")
            .pipe(gzip)
            .pipe(res);
    })
    .listen(8000, "localhost");