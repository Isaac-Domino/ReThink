import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "../../../src/xata";
import { redirect } from "next/dist/server/api-utils";
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from "next";
import { currentUser } from "@clerk/nextjs";


const xata =  getXataClient();


const documentData = z.object({
   userId: z.string(),
   name: z.string(),
   documents: z.coerce.number(),
   questions: z.coerce.number()
})

//storing document to the database
export async function POST(req: Request, res: Response) {
     try
      {
          const { userId,  name, number_of_documents, number_of_questions } = await req.json();
          const documents = Number(number_of_documents);
          const questions = Number(number_of_questions);

          documentData.safeParse({
           userId: userId,
           name: name,
           documents: number_of_documents,
           questions: number_of_questions
         })
           
          console.log("TYPE: ", typeof documents)

          const result = await xata.db.document.create({
            user_id: userId,
            name: name,
            number_of_documents: documents,
            number_of_questions: questions
         }) 
           console.log("Successfully created data to the database", result);  
          
           
           return NextResponse.json(result, { status: 200})

          
      }

     catch(err) {
      console.log(err)
      return NextResponse.json(err)
     }
}