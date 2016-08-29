const printFiltringFiles = require('./printFiltringFilesModule');

let pathDir = process.argv[2],
    filter = process.argv[3];

printFiltringFiles(pathDir, filter, (err, data) =>{
    if(err) return   console.error('Ошибка!!! '+err);
    data.forEach( (file) => console.log(file));
 });