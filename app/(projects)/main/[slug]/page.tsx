
import React from 'react'
import { getXataClient } from '../../../../src/xata';
import  { currentUser, auth } from '@clerk/nextjs/server'
import { GetStaticPropsContext } from 'next';
import axios from 'axios';

const xata = getXataClient();

export async function generateStaticParams() {
   try { 
     const res = await fetch(`/api/main`);
     return {
      slug: res.id 
     } 

   } catch (error) {
     console.error(error);
     return [];
   }
}


async function getData(id: string) {
   const data = await xata.db.document.filter('id', id).getFirst() //filtering the data using id or slug
   return data;
}


export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const data =  await getData(slug);

  return (
    <div>
        DISPLAY USER INFO: {data?.name}
        <p>{data?.user_id}</p>
        <p>{data?.id}</p>
    </div>
  )
}
