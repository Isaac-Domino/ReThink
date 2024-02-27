
import React from 'react'
import { getXataClient } from '../../../../src/xata';
import  { currentUser, auth } from '@clerk/nextjs/server'
import { GetStaticPropsContext } from 'next';
import axios from 'axios';
import Mainchat from '@/components/mainchat';
import { savedDataDbType } from '../../../../types';

const xata = getXataClient();

type idString = {
  id: string,
}
/*export async function generateStaticParams() {
  const data = await fetch('https://Rusty-Ramos-s-workspace-9h3m5o.ap-southeast-2.xata.sh/db/rethinkdb:main/tables/document').then((res) => res.json())
  
  return {
     slug: data.file_key+'.pdf'
  }
} */

async function getData(id: string) {
   const data = await xata.db.document.filter('file_key', id).getFirst() //filtering the data using id or slug
   return data;
}

export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const file_key = `${slug}.pdf`;
    const data =  await getData(file_key);
    const clientData = JSON.parse(JSON.stringify(data));

    if (!data) {
      return <div>Loading...</div>;
    }
  
    return <Mainchat data={clientData} />;
}
