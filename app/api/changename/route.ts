import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getXataClient } from "../../../src/xata";

const xata = getXataClient();

export async function POST(req: Request, res: Response) {
    const { userId } = auth();
  
      if(!userId) {
        return NextResponse.json({message: "User not authenticated"}, { status: 401 });
      }
  
      const { item, id } = await req.json();
      try { 
        const res = await xata.db.document.update(id, {
           name: item
        })
        return NextResponse.json(res, { status: 200});
      }
      catch(err) {
        return NextResponse.json(err, { status: 400});
      }
  }
  
  