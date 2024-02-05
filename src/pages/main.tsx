'use client'

import NavbarMain from '@/components/navbar-main'
import React, { useRef, useState } from 'react'
import { Pencil, FolderClosed, FilePlus2, Menu, Bot, Send, X, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from "framer-motion"

const menuVariants = {
  clicked: { opacity: 1, x: -6, },
  notclicked: { opacity: 0, x: "-100%",}
}


export default function Main() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [menuClick, setMenuClick] = useState<boolean>(false);
    const [chatClick, setChatClick] = useState<boolean>(false);

   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if(e.target.files) {
        console.log(e.target.files[0]);
      }
   }
    
    function handleMenuClick(e: React.MouseEvent) {
       setMenuClick(prev => !prev)
       
       if(menuClick) {
         setChatClick(false);
       }
    }


    console.log(chatClick)

  return (  
   <div className='w-full min-w-full overflow-x-hidden min-h-screen h-auto'>
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
          <div className='text-gray-700 flex flex-col gap-4'>
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

  {/**FOR SMALLER SCREENS */}
  <div className='flex w-full relative mb-2 justify-between py-4 px-2 md:hidden  items-center gap-4'>
      <Menu 
        className={`md:hidden block ${menuClick ? 'invisible' : 'visible'}`}
        size={32}
        onClick={() => setMenuClick(prev => !prev)}
      />

         <MessageCircle 
           onClick={() => setChatClick(prev => !prev)}
           size={40}
           fill='#A759C2'
           color='#A759C2'   
           className={`md:hidden block ${chatClick ? 'invisible' : 'visible'}`} 
         />

       <motion.div  
          animate={menuClick ? "clicked" : 'notclicked'}
          variants={menuVariants}
          transition={{ type: "tween", delay: 0.1, ease: 'backInOut'}}
          className={`w-[220px] absolute top-0 border bg-slate-200 z-50 min-h-[1300px]`}>
           <X 
             className='absolute right-2 top-2'
             size={24}
             onClick={handleMenuClick}
            />

             {/**DOCUMENT NAME */}
      <div className='mt-[45px] mx-2'>
         <div className='flex gap-2 items-center'>
            <p>Doc name</p>
            <Pencil />
         </div>
      </div>

          <div className='mt-[160px] h-auto w-full px-2'>
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
       </motion.div>

       <motion.div
          animate={chatClick ? { opacity: 1, x: -6, } : { opacity: 0, x: 200 }}
          transition={{ type: "tween", delay: 0.1, ease: 'backInOut'}}
          className={`w-[250px] absolute right-0 top-0 border bg-slate-200 z-50 min-h-[1300px]`}>
           <X 
             className='absolute right-2 top-2'
             size={24}
             onClick={() => setChatClick(prev => !prev)}
            />
          {/**TOP */}
          <div className='flex gap-2 items-center m-4'>
            <Bot 
            size={24}
            className=''
            /><span className='text-[20px]'>Chat</span>
          </div>
         <div className='absolute bottom-1 w-full max-h-[650px] overflow-y-auto h-auto px-2 py-4'>
               <div className='flex flex-col gap-[24px] w-full'>
                 {/**AI CHAT */} 
                  <div className='bg-primaryColor text-wrap whitespace-normal break-words text-white w-fit p-2 rounded-md'>
                     <p className='text-sm'>AI CHAT</p>
                  </div>

               {/**YOUR CHAT */} 
               <div className='bg-[#3970b8] text-wrap whitespace-normal break-words self-end w-fit p-2 rounded-md text-white'>
                     <p className='text-sm'> YOUR CHAT</p>
                  </div>
                  
                  <div className='bg-[#3970b8] text-wrap whitespace-normal break-words self-end w-fit p-2 rounded-md text-white'>
                     <p className='text-sm'> YOUR CHAT</p>
                  </div>
               </div>

          {/**USER INPUTS HERE */}
               <div className='flex mt-[45px] items-center gap-2 min-w-full'>
                   <input
                    type="text" 
                    className='border-accentColor bg-white focus:outline-accentColor lg:flex-1 border rounded-full md:w-[160px] lg:w-[265px] w-[180px] h-[45px] indent-3' placeholder='Ask any question'/>
                     <Send 
                       color='#ffff'
                       size={32}
                       className='bg-secondaryColor w-[40px] h-auto md:w-[60px] lg:w-[40px] lg:h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out'
                     />
                  
               </div>
          </div>
       </motion.div>

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
      <div className='border-[#C0BCD1] relative hidden md:block border md:w-[500px] lg:w-[520px] min-h-screen'>
          {/**TOP */}
          <div className='flex gap-2 items-center m-4'>
            <Bot 
            size={24}
            className=''
            /><span className='text-[20px]'>Chat</span>
          </div>

          <div className='absolute bottom-1 w-full max-h-[650px] overflow-y-auto h-auto px-2 py-4'>
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

          {/**USER INPUTS HERE */}
               <div className='flex mt-[45px] items-center gap-2 min-w-full'>
                   <input
                    type="text" 
                    className='border-accentColor bg-white focus:outline-accentColor lg:flex-1 border rounded-full md:w-[160px] lg:w-[265px] h-[50px] indent-3' placeholder='Ask any question'/>
                     <Send 
                       color='#ffff'
                       size={32}
                       className='bg-secondaryColor md:w-[60px] lg:w-[40px] lg:h-auto rounded-lg p-2 hover:bg-[#5C87C7] cursor-pointer duration-200 ease-in-out'
                     />
                  
               </div>
          </div>
      </div>

  </main>
</div>
  )
}
