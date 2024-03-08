
import React, { Suspense } from 'react'
import Mainchat from '@/components/mainchat';
import { Loader2 } from 'lucide-react';
import { getData } from '@/lib/getData';


export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const data =  await getData(slug);
    const clientData = JSON.parse(JSON.stringify(data));

    console.log('FILE KEY:', data?.file_key)

    return (
         <Mainchat data={clientData} /> 
    )
    ;
}
