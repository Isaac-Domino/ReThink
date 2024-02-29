import { utapi } from '@/server/uploadthing';
import { Pinecone } from '@pinecone-database/pinecone';
import axios from 'axios';
import fs from 'fs';
import { UTApi } from 'uploadthing/server';
import { downloadFile } from './downloadFile';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index('rethink');

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
}

export async function loadFileUrlToPinecone(file_key: string) {
  try {
    const filePath = await downloadFile(file_key);

   
    const loader = new PDFLoader(filePath, {
       parsedItemSeparator: '',
       splitPages: true
    });
    const pages = (await loader.load()) as PDFPage[];
   
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
  });
  
  
    const splitPages = await textSplitter.splitDocuments(pages);
    console.log("FILE SPLITTER: ", pages);
   } 
 catch (error) {
    console.error('Error loading file to Pinecone:', error);
}
}


