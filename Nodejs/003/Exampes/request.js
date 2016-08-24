"use strict";

//----------------------------------------------------

const fs        = require("fs");
const request   = require("request");

//----------------------------------------------------

express() // <-- WebServer
    .get(function(req, res) {
        fs.createReadStream("game.rar")
        .pipe(limit(100, res))
        .pipe(res);



        fs.createReadStream("game.rar")
            .pipe(res)
            .on("error", function(e) {
                res.send("Error!");
            });

        //
        //fs.readFile("data.big", function(err, data) {
        //    res.send(data);
        //})
    })






request
    .get("https://nodei.co/npm/request.png")
    .pipe(fs.createWriteStream("img.png"));

