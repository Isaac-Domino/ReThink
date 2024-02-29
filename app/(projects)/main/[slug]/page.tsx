
import React, { Suspense } from 'react'
import Mainchat from '@/components/mainchat';
import { Loader2 } from 'lucide-react';
import { getData } from '@/lib/getData';


export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;
   // const file_key = `${slug}.pdf`;
    const data =  await getData(slug);
    const clientData = JSON.parse(JSON.stringify(data));

    return (
       <Suspense key={slug} fallback={<Loader2 />}>
         <Mainchat data={clientData} /> 
       </Suspense>
    )
    ;
}
