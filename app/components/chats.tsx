'use client'

import { Message, useChat } from 'ai/react';
import { Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth, currentUser, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';


export default function Chats ({ fileKey, id }: { fileKey: string | null, id: string | null}): JSX.Element  {
    const { userId } = useAuth();
    const { user } = useUser()
    const messageContainer = useRef<HTMLDivElement>(null);

    const { data: chatdata, isLoading: loading, error } = useQuery({
      
      queryKey: ['chats', id],
      queryFn: async () => {
        const response = await axios.post<Message[]>("/api/getMessages", {
          userId,
          id
        });
        return response.data;
      }
   })

    const { input, handleSubmit, handleInputChange, messages, isLoading, data , } = useChat({
        api: '/api/openai',
        body: {
          fileKey,
          userId,
          id
        },
        onFinish: (res) => {
             console.log("Successfully created chat");
        },
        initialMessages: chatdata || [],
    })

   useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageContainer.current?.scrollHeight;
    }
   }, [messages])
  
    return (
      <div 
      className='overflow-y-auto flex flex-col gap-3 h-full '
      >

      <div
       ref={messageContainer}
       className="w-full h-full items-end self-end align-items-end overflow-y-scroll relative bottom-0 px-2 py-4 ">
        <div className="flex flex-col  gap-[24px] h-auto w-full px-4">
          {/**CHAT STREAMING HERE */}
            {messages.map((m) => (
             <div key={m.id} className={cn("flex items-start", { "self-end": m.role === 'user'})}> 
              {/**CHAT BOX */}
              <div
                className={cn(
                  "text-wrap mx-2 whitespace-normal break-words text-white w-fit p-2 rounded-md",
                  {
                    "bg-[#8768a5]": m.role === "assistant",
                    "bg-[#3970b8]": m.role === "user",
                  }
                )}
              >
                <div>
                  <p className="text-md">{m.content}</p>
                </div>
              </div>

                {m.role === 'user' && 
                <Image
                 src={user?.imageUrl || ""}
                 alt="user avatar"
                 width={30}
                 height={30}
                 className='rounded-full'
               />  
               }
              </div>
            ))}
            {isLoading && <div className='self-end text-start text-sm left-0 flex items-start text-gray-400 w-full'>Waiting for response.....</div>}
        </div>


      </div>
          {/**USER INPUTS HERE */}
          <form
          onSubmit={handleSubmit}
          className="flex items-start justify-center overflow-hidden mb-[10px] h-[150px] w-full  gap-2 min-w-full px-2"
          >
          <input
            onChange={handleInputChange}
            type="text"
            className="border-accentColor bg-white focus:outline-accentColor lg:flex-1 border rounded-full md:w-[160px] lg:w-[255px] h-[50px] indent-3"
            placeholder="Ask any question"
            value={input}
            disabled={isLoading}
          />
        <button type='submit' className={`self-start ${isLoading ? 'opacity-70' : 'opacity-100'}`} disabled={isLoading}>
         <Send
            color="#ffff"
            size={32}
            className="bg-secondaryColor md:w-[60px] lg:w-[40px] lg:h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out"
          />
        </button>
        </form>
    </div>
    );
}


