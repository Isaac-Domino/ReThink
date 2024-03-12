'use client'

import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth, currentUser, useUser } from '@clerk/nextjs';



const Chats = ({ fileKey }: { fileKey: string | null}): JSX.Element => {
    const { input, handleSubmit, handleInputChange, messages, isLoading, data } = useChat( {
        api: '/api/openai',
        body: {
          fileKey
        },
        onFinish: (res) => {
             toast.success(res.role);
             console.log("Successfully created chat");
        }
    })
     const { user } = useUser()
 
  
    return (
      <div className="absolute bottom-1 w-full max-h-[650px] overflow-y-auto h-auto px-2 py-4">
        <div className="flex flex-col gap-[24px] w-full">
          {/**CHAT STREAMING HERE */}
            {messages.map((m) => (
             <div key={m.id} className={cn("flex items-start", { "self-end": m.role === 'user'})}> 
              {/**CHAT BOX */}
              <div
                className={cn(
                  "text-wrap mx-4 whitespace-normal break-words text-white w-fit p-2 rounded-md",
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
                 src={(user && user.imageUrl) || ""}
                 alt="user avatar"
                 width={30}
                 height={30}
                 className='rounded-full'
               /> }
              </div>
            ))}
        </div>

        {/**USER INPUTS HERE */}
        <form
          onSubmit={handleSubmit}
          className="flex mt-[45px] items-center gap-2 min-w-full"
        >
          <input
            onChange={handleInputChange}
            type="text"
            className="border-accentColor bg-white focus:outline-accentColor lg:flex-1 border rounded-full md:w-[160px] lg:w-[265px] h-[50px] indent-3"
            placeholder="Ask any question"
            value={input}
            disabled={isLoading}
          />
          <Send
            color="#ffff"
            size={32}
            type="submit"
            className="bg-secondaryColor md:w-[60px] lg:w-[40px] lg:h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out"
          />
        </form>
      </div>
    );
}


export default Chats;