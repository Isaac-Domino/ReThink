import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import axios from 'axios';
import { Send } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';



export default function ChatMobile({ fileKey, id }: { fileKey: string | null, id: string | null}) {
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

    const { input, handleSubmit, handleInputChange, messages, isLoading, data } = useChat({
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
     ref={messageContainer}
     className='overflow-y-auto flex flex-col gap-3'
     >
     <div
       className="w-full overflow-y-scroll relative bottom-0 h-full px-2 py-4">
        <div className="flex flex-col gap-[24px] w-full">
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
                  <p className="text-sm md:text-md">{m.content}</p>
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
          className="flex 
            overflow-hidden 
            bottom-4 mt-[2px]  h-[70px] items-center gap-2 min-w-full px-2 w-full"
        >
          <input
            onChange={handleInputChange}
            type="text"
            className="border-accentColor bg-white focus:outline-accentColor lg:flex-1 border rounded-full w-full h-[50px] indent-3"
            placeholder="Ask any question"
            value={input}
            disabled={isLoading}
          />
        <button type='submit' disabled={isLoading}>
         <Send
            color="#ffff"
            size={32}
            className="bg-secondaryColor w-[40px] h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out"
          />
        </button>
        </form>
    </div>
    );
}
