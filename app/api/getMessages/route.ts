import { NextResponse } from "next/server";
import { getXataClient } from "../../../src/xata";

const xata = getXataClient();

export async function POST(req: Request) {
    const { userId, id } = await req.json();
  try {

    if(!userId) return NextResponse.json('User not Authenticated', { status: 401 })

    const res = await xata.db.chats.filter('document_id', id).sort('xata.createdAt', 'asc').getAll();

    return NextResponse.json(res);

  } catch (error) {
    console.log('SOME ERROR OCCURED', error)
    return NextResponse.json(error, { status: 500 })
  }
          
}