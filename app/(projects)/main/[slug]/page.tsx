
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
   try { 
     const res = await axios.get('/api/fetchdata');

      const data = res.data;

     return data.map((item: { id: string}) => ({
      params: {
        slug: item.id,
      },
    }));

   } catch (error) {
     console.error(error);
     return[];
   }
} */


async function getData(id: string) {
   const data = await xata.db.document.filter('id', id).getFirst() //filtering the data using id or slug
   return data;
}


export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data =  await getData(slug);

    if (!data) {
      return <div>Loading...</div>;
    }
  
    return <Mainchat data={data} />;
}
