import { Pinecone } from '@pinecone-database/pinecone';
import axios from 'axios';
import fs from 'fs';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const index = pc.index('rethink');

export async function loadPDFFromEdgeStore(result: any) {
    'download pdf from edge store'

    try {
        // Fetch the PDF file from the provided URL
        //const response = await axios.get('', { responseType: 'stream' });

        // Generate a unique filename
        const document = `/tmp/${Date.now()}.pdf`;
        // Create a write stream to save the PDF file
        const writer = fs.createWriteStream(document);

        // Pipe the response stream to the writer
        result.file_link.pipe(writer);

        // Wait for the writer to finish writing the file
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

      console.log('PDF file downloaded and saved successfully:', document);
    } catch (error) {
      console.error('Error downloading PDF file:', error);
    }
}

//TOMORROW TODOS:
/*
   1. POSTING DATA FROM ARCHIVES THEN STORE DOCUMENT AND CREATE NEW DOC USING WRITEFILESYNC 
*/