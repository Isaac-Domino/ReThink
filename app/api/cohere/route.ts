import { getContext, getContextforCohere } from '@/lib/context';
import { convertToAscii } from '@/lib/convertToAscii';
import { Pinecone } from '@pinecone-database/pinecone';
import { CohereStream, StreamingTextResponse } from 'ai';
import { CohereClient, Cohere } from 'cohere-ai';
import { ChatDocument } from 'cohere-ai/api/types';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
 
if (!process.env.COHERE_API_KEY) {
  throw new Error('Missing COHERE_API_KEY environment variable');
}
 
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
 
const toCohereRole = (role: string): Cohere.ChatMessageRole => {
  if (role === 'user') {
    return Cohere.ChatMessageRole.User;
  }
  return Cohere.ChatMessageRole.Chatbot;
};


const pc = new Pinecone({
    apiKey: 'your_api_key',
});

type Metadata = {
    text: string;
    pageNumber: number;
};
export async function POST (req: Request) {
   // Extract the `prompt` from the body of the request
  const { messages, fileKey } = await req.json();
  //const context = await getContextforCohere(messages[messages.length - 1], fileKey);
  console.log(messages);

  //const namespace = pc.index('rethink').namespace(convertToAscii(fileKey));
   //search query 

   const embed = await cohere.embed({ 
    texts: [messages], 
    model: "embed-english-v3.0",
    inputType: "search_query",
    truncate: 'END'
   });


  try {
    
    const userQuery = messages[messages.length - 1].content;
    const relevantDocuments = await getDocumentsFromPinecone(userQuery, embed.embeddings as number[]);

    const chatHistory = messages.map((message: any) => ({
        message: message.content,
        role: toCohereRole(message.role),
      }));
      const lastMessage = chatHistory.pop();
     
      const response = await cohere.chatStream({
        message: lastMessage.message,
        chatHistory,
        citationQuality: 'accurate',
        documents: relevantDocuments,
        searchQueriesOnly: true
      });
     
      const stream = new ReadableStream({
        async start(controller) {
          for await (const event of response) {
            if (event.eventType === 'text-generation') {
              controller.enqueue(event.text);
            }
          }
          controller.close();
        },
      });
     
      return new Response(stream);

  } catch (error) {
    console.log("Something went error matching vectors", error);
    throw Error;
  }
 /* 
 */
}

async function getDocumentsFromPinecone(query: string, embed: number[]) {
  // Query Pinecone to retrieve relevant documents based on the user's query
  // Replace this with your actual Pinecone query logic
  const relevantDocuments = await pc.index('rethink').query({
    includeValues: true,
    vector: embed,
    topK: 5, // Adjust as needed 
    includeMetadata: true, 
  });

  // Extract relevant document IDs and metadata
  const documents = relevantDocuments.matches.map((match) => ({
    id: match.id,
    metadata: match.metadata,
  }));

  return documents;
}