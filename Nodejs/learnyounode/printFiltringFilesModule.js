const fs = require('fs');
const path = require('path');

module.exports = (pathFolder, extname, callback) => {
    fs.readdir(pathFolder, (err, list) => {
        if (err) 
            return callback(err);
        list = list.filter( (item) =>  path.extname(item) === '.'+extname );
        callback(null, list);
    })
}