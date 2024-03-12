import { utapi } from "@/server/uploadthing"
import axios from "axios";
import fs from 'fs'
import path from 'path';
import { mkdirp } from 'mkdirp';
import pdf from "pdf-thumbnail";
import { getXataClient } from "../../src/xata";

export async function downloadFile(file_key: string) {
    const xata = getXataClient();
    try {
        // Obtain file URL from the database
        const getFile = await utapi.getFileUrls(file_key, {
            keyType: "fileKey"
        });

        // Extract filename from URL
        const filename = path.basename(getFile[0].url);

        // Construct folder path
        const folderPath = `/tmp/uploads/${file_key}`;

        // Create directory if it doesn't exist
        await mkdirp(folderPath);

        // Construct full file path
        const filePath = path.join(folderPath, filename);

        // Make HTTP GET request to download the file
        const response = await axios.get(getFile[0].url, {
            responseType: 'arraybuffer' // To receive data as Buffer
        });

        // Save the file to the local machine
        fs.writeFileSync(filePath, response.data);

        console.log('File downloaded successfully.', filePath);
        
        // Return the file path

        //create thumbnail for pdf file
     /*  await pdf(
             fs.readFileSync(filePath),
         ).then((data) /*is a stream => {
           const savedThumbnail = data.pipe(fs.createWriteStream(`./${file_key}.jpg`))
            //save to the database 
            //save the file to the uploadThing
            const uploadThumbnail = utapi.uploadFiles(savedThumbnail).then((thumb) => {
                    xata.db.document.update(rec, {
                    thumbnail_url: thumb.data?.url[0]
                 })
             })

            console.log('UPLOADED: ', uploadThumbnail);
         })
           .catch((err) => console.error(err));
      */
        return filePath;

    } catch (error) {
        console.error('Error downloading file:', error);
        throw error; // Rethrow the error for handling in the caller function
    }

}