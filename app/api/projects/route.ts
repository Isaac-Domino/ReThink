import { auth } from "@clerk/nextjs";
import { getXataClient } from "../../../src/xata";
import { NextResponse } from "next/server";

export async function GET() {
        const xata = getXataClient();
        const { userId } = auth();

        try {
           const data = await xata.db.document.filter({
               user_id: userId
           }).getAll();
      
           return NextResponse.json(data, { status: 200});

        } catch (error) {
           console.log('Error rendering data', error);
           return  NextResponse.json(error, { status: 400});
        }
    
}

export async function DELETE (req: Request, res: Response) {
   const xata = getXataClient();
   const { userId } = auth();

   const { id } = await req.json();

   try {
      const data = await xata.db.document.delete(id as string)
 
      return NextResponse.json(data, { status: 200});
   } catch (error) {
      console.log('Error rendering data', error);
      return  NextResponse.json(error, { status: 400});
   }
}