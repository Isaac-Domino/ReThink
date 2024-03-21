
'use client'

import NavbarMain from '@/components/navbar-main'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/main.css'
import Link from 'next/link'
import { FolderClosed } from 'lucide-react' 
import Chats from '@/components/chats'
import ChatSkeleton from '@/components/ChatSkeleton'

export default function Loading() {
      return (
       <div className="w-full min-h-screen min-w-full h-screen overflow-x-hidden overflow-y-hidden ">
          <NavbarMain />
          <SkeletonTheme baseColor="#D0D0D0" highlightColor="#F0EAF3">
            {/**SIDEBAR */}
            <div  className="border w-full px-4 py-4 block h-full">
              {/**NAME OF THE DOCUMENT */}
              <div id='sidebar-content' className="py-3">
                  <div className="flex text-gray-700 max-w-full items-center cursor-pointer">
                    <Skeleton count={1} width={170} height={20}/>
                  </div>    
                {/**OPTIONS AVAILABLE */}
                <div className="text-gray-700 items-center flex gap-2">
                   <Skeleton circle width={30} height={30}/>
                   <Skeleton count={1} width={140} height={25}/>
                </div>
              </div>
            </div>
            {/**FOR MOBILE DISPLAY CHAT */}
            <div className="fixed bottom-5 right-5">
               <Skeleton circle className='size-16' />
            </div>
    
            {/**CHAT BOX */}
            <div className=" absolute top-16 right-0 hidden lg:block border w-[490px] min-h-[92%] h-[92%]">
              {/**TOP */}
              <div className="flex gap-2 text-primaryColor w-auto items-center m-4">
                <Skeleton circle width={30} height={30} />
                <Skeleton width={100} height={30}/>
              </div>
    
              {/**CHAT COMPLETION  */}
                  <ChatSkeleton  />
            </div> 
          </SkeletonTheme>
        </div>
      )
  }
