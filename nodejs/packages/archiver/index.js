const fs = require('fs');

const archiver  = require('archiver');


const output = fs.createWriteStream('./all1.zip');

const archive = archiver('zip', { zlib: { level: 9 }});

archive.pipe(output);

archive.on('error', () => {
   console.log('error.....');     
});

output.on('close', () => {
    console.log(archive.pointer() + ' total size');
});

archive.directory('archFile/', false);

archive.finalize();


