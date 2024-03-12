import { revalidatePath } from "next/cache";
import { getXataClient } from "../../src/xata";
import { auth } from '@clerk/nextjs'



export async function changeName(rec: string) {
    const xata = getXataClient();
    const { userId } = auth();
    
    if(!userId) {
        throw new Error("User not authenticated");
    }
    try {
        const res = await xata.db.document.update(rec, {
             name: 'name to update',
        })
         console.log('RESULT', res);
         revalidatePath(`/main${rec}`);
         return res;
    } catch (error) {
        console.log('ERROR: ', error);
        return;
    }
}

export async function deleteData (rec: string) {
    const xata = getXataClient();
    const { userId } = auth();
    
    if(!userId) {
        throw new Error("User not authenticated");
    }
    try {

        const res = await xata.db.document.delete(rec);
        console.log('RESULT', res);
        revalidatePath(`/projects`);
        return res;

    } catch (error) {
        console.log(error)
    }
}
