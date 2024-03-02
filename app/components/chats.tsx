'use client'

import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';


const Chats = (): JSX.Element => {
    const { input, handleSubmit, handleInputChange, messages, isLoading } = useChat( {
        api: '/api/chat',
        onFinish: (res) => {
             toast.success(res.role);
             console.log("Successfully created chat");
        }
    })


    return (
      <div className="absolute bottom-1 w-full max-h-[650px] overflow-y-auto h-auto px-2 py-4">
        <div className="flex flex-col gap-[24px] w-full">
          {/**CHAT COMPLETION HERE */}
          {messages.map((m) => (
            <div key={m.id}
              className={cn('text-wrap whitespace-normal break-words text-white w-fit p-2 rounded-md', {
                  'bg-[#8768a5]': m.role === 'assistant',
                  'bg-[#3970b8]': m.role === 'user'
              })}
            >
              {m.role === "user" ? "User: " : "AI: "}
               
               <div>
                  <p>{m.content}</p>
               </div>
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
          />
          <Send
            color="#ffff"
            size={32}
            className="bg-secondaryColor md:w-[60px] lg:w-[40px] lg:h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out"
          />
        </form>
      </div>
    );
}
// #endregion

export default Chats;