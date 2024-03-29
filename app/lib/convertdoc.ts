'use strict';

const path = require('path');
const fs = require('fs/promises')

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

export async function convertToPdf(filePath: string) {
   try {
    const outputPath = filePath.replace(/\.[^.]+$/, '.pdf');
    const ext = path.extname(filePath);

    // Use pipe to transfer file without loading it into memory
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(outputPath);
    const libreTransformStream = libre.convert(ext, undefined);

   const convertedDoc = readStream.pipe(libreTransformStream).pipe(writeStream);
   console.log('File converted to PDF successfully:', outputPath);
    // Resolve when the file writing is done
    await new Promise(resolve => writeStream.on('close', resolve));
    return convertedDoc;

   } catch (error) {
      console.log(error);
   }
}

