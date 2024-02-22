import { getXataClient } from "../../src/xata";

const xata = getXataClient();

export async function getData() {
    const res = await xata.db.document.filter('uid', )
}


