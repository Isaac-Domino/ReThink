'use client'

import { X } from 'lucide-react'
import React, { useState } from 'react'
import { savedDataDbType } from '../../types'
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { revalidatePath } from 'next/cache';



export default function Lists({ data }: { data: savedDataDbType}) {
   const { mutate, error, isPending } = useMutation({
       mutationFn: async (id: string) => axios.delete('/api/projects', { data: id }),
       onError: (error: any) => console.log(error),
       onSuccess: () => toast.success('Succesfully deleted')
   })

   function formatDate(date: string) {
     const newDate = new Date(date);

       const formatDateTime = new Intl.DateTimeFormat('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour12: true
       }).format(newDate);

       return formatDateTime;
   }
   
   async function deleteFile (id: string, e: React.MouseEvent) {
     e.stopPropagation();
     e.preventDefault();

      if(isPending) {
         toast.loading('Deleting file.....')
      }
       mutate(id, {
         onSuccess: () => {
           console.log('Done deleted!');
         }
       })
      //revalidatePath('/projects', 'page');
   }

  return (
    <Link
      href={``}
      className="border flex items-center gap-8
       border-primaryColor px-4 py-2 
      max-w-auto h-auto min-h-[40px] rounded-lg 
      hover:bg-purple-50 duration-200 ease-linear transition-colors
      shadow-md shadow-gray-200 justify-between "
    >
      {/**DOCUMENT INFO */}
      <div>
        <p className="font-medium">{data.name}</p>
        <p className="font-light text-[14px] text-gray-500">
          {formatDate(data.xata.updatedAt)}
        </p>
      </div>

      <button className='cursor-pointer hover:scale-105' onClick={(e) =>  deleteFile(data.id, e)}>
        <X size={24} cursor={"pointer"} />
      </button>

    </Link>
  );
}

export function DeleteDialog() {
  return (
      <Card className='absolute top-0 '>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
  )
}
