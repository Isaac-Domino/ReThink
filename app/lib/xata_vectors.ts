import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { getXataClient } from "../../src/xata";
import { vectorSearchTable } from "@xata.io/client";
import { XataVectorSearch } from "@langchain/community/vectorstores/xata";
import { BaseClient } from "@xata.io/client";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { downloadFile } from "./downloadFile";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";


type PDFPage = {
  pageContent: string;
  metadata: {
     pageNumber: number;
  };
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};


async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter({
     chunkSize: 1000,
     chunkOverlap: 200
  });

  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
export async function loadFileKeyToXataVector(filekey: string)  {
  try {
    const client = getXataClient();
    const filePath = await downloadFile(filekey);

    const loader = new PDFLoader(filePath);
    const pages = (await loader.load()) as PDFPage[]
    const documents = await Promise.all(pages.map(prepareDocument));
    //embed document 
  
    const table = "vectors";
    const embeddings = new OpenAIEmbeddings({
        modelName: 'text-embedding-3-small',
        openAIApiKey: process.env.OPENAI_API_KEY_2,
    });
    const store = new XataVectorSearch(embeddings, { client, table });
    // Add documents
    const ids: string[] = await store.addDocuments(documents[0]);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((r) => setTimeout(r, 2000));

    console.log('IDS', ids)

  } catch (error) {
     console.log('ERORR', error)
  }
}
