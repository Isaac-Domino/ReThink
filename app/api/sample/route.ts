import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "../../../src/xata";
import { redirect } from "next/dist/server/api-utils";
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from "next";
import { auth, currentUser } from "@clerk/nextjs";
import { loadPDFFromEdgeStore } from "@/lib/pinecone";

const xata = getXataClient();

const documentData = z.object({
   userId: z.string(),
   name: z.string(),
   documents: z.coerce.number(),
   questions: z.coerce.number(),
   url: z.string(),
})

//storing document to the database
export async function POST(req: Request, res: Response) {
    const { userId } = auth();

    if(!userId) {
      return NextResponse.json({message: "User not authenticated"}, { status: 401 });
    }
     try
      {
          const { name, number_of_documents, number_of_questions, url } = await req.json();
          const documents = Number(number_of_documents);
          const questions = Number(number_of_questions);

          documentData.safeParse({
           userId: userId,
           name: name,
           documents: number_of_documents,
           questions: number_of_questions,
           url: url,
         })
           
          console.log("TYPE: ", typeof documents)

          const result = await xata.db.document.create({
            user_id: userId,
            name: name,
            number_of_documents: documents,
            number_of_questions: questions,
            file_link: url,
         })

         if(result) {
            await loadPDFFromEdgeStore(result);
            console.log('SUCCESSFULLY LOAD PDF FROM EDGESTORE');
         }
           console.log("Successfully created data to the database", result);  
           //return NextResponse.json(result, { status: 200});

           return NextResponse.json(result, {status: 200})
         }
      catch(err) {
      console.log(err)

      return NextResponse.json(err)
     }
}

