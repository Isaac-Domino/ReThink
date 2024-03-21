import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function ChatSkeleton() {
  return (
    <div>
     <div className="flex flex-col gap-[24px] w-full px-4">
          <div className={"flex gap-2 items-start self-end"}> 
           {/**CHAT BOX */}
             <Skeleton 
               className=''
               width={320}
               height={100}
             />
             <Skeleton
              circle
              width={50}
              height={50}
            />  
         </div>

         <div className={"flex items-start self-start"}> 
             <Skeleton
              width={250}
              count={2}
              height={30}
              className='rounded-full'
            />  
         </div>

     </div>
     <div
       className="flex absolute bottom-8 mt-[35px] items-center gap-2 min-w-full px-2"
     >
       <Skeleton
         width={400}
         height={50}
         className='rounded-lg'
       />
     <div>
       <Skeleton
         width={50}
         height={50}
         circle
        />
     </div>
     </div>
   </div>
  )
}
