'use client'


import NavbarMain from '@/components/navbar-main'
import React, { ReactHTMLElement, useRef } from 'react'
import { Pencil, FolderClosed, FilePlus2, Menu, Bot, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'



export default function Main() {
    const fileRef = useRef<HTMLInputElement>(null);


   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.files) {
        console.log(e.target.files[0]);
      }
   }
    
    

  return (  
    <div className='w-full min-h-screen h-auto'>
        <NavbarMain />
    

<main className='flex  flex-col md:flex-row items-start'>
  {/**SIDEBAR */}

  <div className='border px-4 py-4 hidden md:block min-w-[200px] w-[250px] h-screen'> 
          {/**NAME OF THE DOCUMENT */}

    <div className='h-full md:py-2 flex items-start justify-between flex-col'> 
       <div className='flex gap-2 items-center cursor-pointer'>
              <p className='text-[18px]'>Docname.pdf</p>
              <Pencil 
                color='black'
                size={24}
              />
          </div>

      {/**OPTIONS AVAILABLE */}
          <div className=' flex flex-col gap-4'>
                <Link className='flex gap-2' href={'/create'}>
                  <FolderClosed />
                   <span>My Archive</span>
                </Link>

                <div className='flex gap-2 cursor-pointer'
                  onClick={() => fileRef?.current?.click()}
                >
                   <FilePlus2 />
                   <span>Insert new document</span>
                </div>
                {/**HIDDEN INPUT TO OPEN FILE EXPLORER WHEN CLICKING THIS */}
                <input 
                  type="file" 
                  ref={fileRef} 
                  className='hidden'
                  onChange={handleFileChange}
                  accept=".doc, .pdf"
                />

          </div>   
        </div>  
  </div>

<div className='flex w-full mb-2 justify-between py-4 px-2 md:hidden items-center gap-4'>
     <Menu className='md:hidden block'
        size={32}
     />
          <Image 
            src={'/chat-icon.svg'}
            width={40}
            height={40}   
            alt='chat icon'
          />  
     </div>
   


      {/**DOCUMENT FILE */}
      <div className='border-[#C0BCD1] px-2 md:px-[35px] overflow-y-auto border mx-auto md:w-[850px] min-w-[340px] sm:w-[600px] max-w-[760px] min-h-screen '>
          <div className='border w-full h-screen'>
             {/**MAP THE DOCUMENTS HERE */}
             <div className='flex w-full flex-col gap-2 items-center'>
                   Images here
             </div>
          </div>
      </div>

      {/**CHAT BOX */}

      <div className='border-[#C0BCD1] relative hidden md:block border w-[400px] min-h-screen'>
          {/**TOP */}
          <div className='flex gap-2 items-center m-4'>
            <Bot 
            size={24}
            className=''
            /><span className='text-[20px]'>Chat</span>
          </div>

          <div className='absolute border bottom-1 w-full max-h-[650px] overflow-y-auto h-auto px-2 py-4'>
               <div className='flex flex-col gap-[24px] w-full'>
                 {/**AI CHAT */} 
                  <div className='bg-primaryColor text-white w-fit p-2 rounded-md'>
                     <p>AI CHAT</p>
                  </div>

               {/**YOUR CHAT */} 
                  <div className='bg-[#3970b8] self-end w-fit p-2 rounded-md text-white'>
                     <p>YOUR CHAT</p>
                  </div>
                  
                  <div className='bg-[#3970b8] self-end w-fit p-2 rounded-md text-white'>
                     <p>YOUR CHAT</p>
                  </div>
               </div>

               <div className='flex mt-[45px] items-center gap-2 w-full'>
                   <input
                    type="text" 
                    className='border-accentColor focus:outline-accentColor flex-1 border rounded-full min-w-[265px] h-[50px] indent-3' placeholder='Ask any question'/>
                     <Send 
                       color='#ffff'
                       className='bg-secondaryColor w-[40px] h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out'
                     />
                  
               </div>
          </div>
      </div>

  </main>
</div>
  )
}
