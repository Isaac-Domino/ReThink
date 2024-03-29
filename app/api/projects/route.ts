import { auth } from "@clerk/nextjs";
import { getXataClient } from "../../../src/xata";
import { NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";
import { Pinecone } from "@pinecone-database/pinecone";
import { revalidatePath } from "next/cache";

export async function GET() {
        const xata = getXataClient();
        const { userId } = auth();

        try {
           const data = await xata.db.document.filter({
               user_id: userId,
           }).sort('xata.updatedAt', 'desc').getAll();
      
           return NextResponse.json(data, { status: 200});

        } catch (error) {
           console.log('Error rendering data', error);
           return  NextResponse.json(error, { status: 400});
        }
}

{/**DELETING DOCUMENT */}
export async function POST (req: Request, res: Response) {
   const xata = getXataClient();
   const { userId } = auth();
   const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
   const index = pinecone.Index("rethink");

   if(!userId) {
      return NextResponse.json({message: "User not authenticated"}, { status: 401 });
    }
   const { id } = await req.json();

   try {
      const data = await xata.db.document.delete(id as string)

      if(data) {
         //DELETE FILE FROM UPLOADTHING
         await utapi.deleteFiles(data?.file_key as string);

         //DELETE EMBEDDINGS FROM PINECONE
        if(index.namespace(data?.file_key as string)) {
         await index.namespace(data?.file_key as string).deleteAll();
          } 
      }
      revalidatePath('/projects');
      return NextResponse.json(data, { status: 200 });

   } catch (error) {
      console.log('Error rendering data', error);
      return  NextResponse.json(error, { status: 400 });
   }
}