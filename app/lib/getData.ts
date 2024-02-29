import { getXataClient } from "../../src/xata";

const xata = getXataClient();

export async function getData(id: string) {
   const data = await xata.db.document.filter('id', id).getFirst() //filtering the data using id or slug
   return data;
}
