import fs from 'fs';

export async function storeFileLocal(file: fs.PathOrFileDescriptor, filepath: fs.PathOrFileDescriptor) {
    return new Promise(async (resolve, reject) => {
        // Read the PDF file
        fs.readFile(file, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          // Write the PDF data to the specified file path
          fs.writeFile(filepath, data, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve('PDF file stored successfully.');
            }
          });
        });
    });
 }