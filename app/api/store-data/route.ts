import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "../../../src/xata";
import { z } from 'zod';
import { auth,  } from "@clerk/nextjs";
import { loadFileUrlToPinecone } from "@/lib/pinecone";

const xata = getXataClient();

const documentData = z.object({
   userId: z.string(),
   name: z.string(),
   url: z.string(),
   file_key: z.string(),
})

//storing document to the database
export async function POST(req: Request, res: Response) {
    const { userId } = auth();

    if(!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
     try
      {
          const { name, url, file_key } = await req.json();
        
          documentData.safeParse({
           userId: userId,
           name: name,
           url: url,
           file_key: file_key
         })
           
          const result = await xata.db.document.create({
            user_id: userId,
            name: name,
            file_link: url,
            file_key: file_key
         })

         if(result.file_key) {
           await loadFileUrlToPinecone(file_key);
         }
           console.log("Successfully created data to the database", result);  
           return NextResponse.json(result , {status: 200})
         }
      catch(err) {
        console.log(err)
        return NextResponse.json(err)
     }
}


export async function PUT(req: Request, res: Response) {
  const { userId } = auth();

    if(!userId) {
      return NextResponse.json({message: "User not authenticated"}, { status: 401 });
    }

    try { 
      const { item, id } = await req.json();

      const res = await xata.db.document.update(id, {
         name: item
      })

      return NextResponse.json(res, { status: 200});
    }
    catch(err) {
      return NextResponse.json(err, { status: 400});
    }
}

