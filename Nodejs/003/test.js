const crypto = require('crypto');
const hash = crypto.createHash('md5');

const fs = require('fs');
const input = fs.createReadStream('test.js');
const output = fs.createWriteStream('output.txt');
let filename = 'test.js';


/*input.on('readable', () => {
  var data = input.read();
  if (data)
    hash.update(data);
  else {
    console.log(`${hash.digest('hex')} ${filename}`);
  }
});

//hash.pipe(input);


input.on('readable' ,() => {
    let data = input.read();
    if (data) 
        hash.update(data);
    else {
      console.log(`${hash.digest('hex')} ${filename}`); 
       
    }
})
   ;*/


input.on()
    .pipe(process.stdout);