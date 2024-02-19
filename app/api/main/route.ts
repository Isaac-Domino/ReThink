import { auth } from "@clerk/nextjs";
import { getXataClient } from "../../../src/xata";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";



export async function GET(req: NextApiRequest, res: NextApiResponse) {
    /*const { userId } = auth();

    const res = await xata.db.document.filter('user_id', userId).getFirst();

    return NextResponse.json(res); */
    const { userId } = auth();
    const xata = getXataClient();
  
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
  
    try {
      const document = await xata.db.document.filter('user_id', userId).getFirst();
      return res.status(200).json(document);  
    } catch (error) {
         console.error(error);
         return res.status(500).json({ error: 'Failed to fetch document' });
    }
}

