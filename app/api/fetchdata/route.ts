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
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
  
    try {
      const document = await xata.db.document.filter('user_id', userId).getFirst();
      return NextResponse.json(document, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch document' }, { status: 500 });
    }
}

