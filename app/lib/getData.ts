import { auth } from "@clerk/nextjs";
import { getXataClient } from "../../src/xata";


export async function getData(id: string) {
   const xata = getXataClient();
   const data = await xata.db.document.filter('id', id).getFirst() //filtering the data using id or slug
   return data;
}


