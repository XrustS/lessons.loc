'use strict';

const crypto = require('crypto');
const hash = crypto.createHash('md5');
const fs = require('fs');
const outFile = fs.createWriteStream('out.txt')


hash.on('readable', () => {
    let data = hash.read();
    if (data) {
        console.log(data.toString('hex'));
    }
});
const input = fs.createReadStream('Test message bdfgergergergr');

hash.write('Test message bdfgergergergr');
hash.end();
/*input.pipe(hash)
    .pipe(outFile);
*/

