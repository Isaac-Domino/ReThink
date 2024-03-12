import React from 'react'
import Lists, { DeleteDialog } from './lists';
import { useQuery } from '@tanstack/react-query';
import { Loader, Loader2 } from 'lucide-react';

export default function Archive() {
  const { isPending, error, data } = useQuery({
    queryKey: ['projects'],
    queryFn: () =>
      fetch('/api/projects').then((res) =>
        res.json(),
      ),
  })

   
  return (
    <div className='p-4 gap-6 w-full overflow-clip grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
 
      {isPending ? <Loader2 className='size-6 text-gray-600 animate-spin'/> 
       :  
       data.map(((item: any) => (
           <Lists data={item} key={item.id}/>     
     )))}   


    </div>
  ) 
} 
