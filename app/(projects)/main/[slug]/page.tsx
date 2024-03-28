
import React from 'react' 
import Mainchat from '@/components/mainchat';
import { getData } from '@/lib/getData';
import { Metadata } from 'next';
import { getXataClient } from '../../../../src/xata';


const xata = getXataClient();

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // fetch data
    const data = await xata.db.document.filter('id', id).getFirst();

    return {
      title: data?.file_key,
      description: data?.id
    }
 }


export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const data =  await getData(slug);
    const clientData = JSON.parse(JSON.stringify(data));

    //console.log('FILE KEY:', data?.file_key)

    return <Mainchat data={clientData} />;
}
