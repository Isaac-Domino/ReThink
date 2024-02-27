'use client'

import NavbarMain from '@/components/navbar-main'
import React, { ReactEventHandler, useRef, useState, useEffect } from 'react'
import { Pencil, FolderClosed, FilePlus2, Menu, Bot, Send, X, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from "framer-motion"
import DocumentFile from '@/components/documentViewer'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone'
import { revalidatePath, revalidateTag } from 'next/cache'
import { savedDataDbType } from '../../types'
import { getXataClient } from '../../src/xata'
import axios from 'axios'
import { toast } from 'sonner'

const menuVariants = {
  clicked: { opacity: 1, x: -6, },
  notclicked: { opacity: 0, x: "-100%",}
}
export default function Mainchat( { data } : { data:  savedDataDbType} ) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState< File | null>(null);
    const [menuClick, setMenuClick] = useState<boolean>(false);
    const [chatClick, setChatClick] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null!);


    const {mutate, isPending } = useMutation({
       mutationFn: async ({ item, id }: { item: string, id: string}) => axios.put('/api/sample', {item, id}),
       
       onSuccess: (res) =>  {
         console.log(res);
       },
       onError: (err) => {
         console.log(err);
       }
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };

     // Attach click event listener to detect clicks outside the input field
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: {
        'application/pdf': ['.pdf']
      },
      maxFiles: 1,
      onDrop: async () => {
          console.log("ACCEPTED FILE:", acceptedFiles);      
      }
   });

   
 
    function handleMenuClick(e: React.MouseEvent) {
       setMenuClick(prev => !prev)
       
       if(menuClick && chatClick) {
         setChatClick(false);
       }
    }

   function handleChangeName(e: React.FormEvent) {
       e.preventDefault();
      
       setEditing(false);
       
       mutate({ item: newName, id: data.id }, {
         onSuccess: (res) => {
           toast.success("Updated document name")
           console.log("RES: ", res)
         },
         onError: (err) => {
           toast.error("Error updating document name: "+err.message);
         }
       })
    }

return (  
  <div className='w-full min-w-full overflow-x-hidden h-screen md:min-h-screen'>
        <NavbarMain />
    
<main className='flex  flex-col md:flex-row items-start'>
  {/**SIDEBAR */}
  <div className='border px-4 relative py-4 hidden md:block min-w-[200px] w-[250px] h-screen'> 
    {/**NAME OF THE DOCUMENT */}
    <div className='h-full md:py-2 flex items-start justify-between flex-col'> 
       {!editing ? 
        <div className='flex gap-2 max-w-full items-center cursor-pointer'>
              <p className='text-[18px]'>{data.name}</p>
              <Pencil 
                color='black'
                size={18}
                onClick={() => setEditing(true)}
              />
          </div> : 
          <form onSubmit={handleChangeName} className='flex gap-2 items-center max-w-full cursor-pointer'>
             <input type="text" 
               placeholder={data.name}
               value={newName}
               onChange={(e) => setNewName(e.target.value)}
               ref={inputRef}
               className='bg-transparent border-1 border w-full'
             />
          </form>

        }

      {/**OPTIONS AVAILABLE */}
          <div className='text-gray-700 flex flex-col gap-4'>
                <Link className='flex gap-2' href={'/create'}>
                  <FolderClosed />
                   <span>My Archive</span>
                </Link>

                <div 
                 {...getRootProps({className: 'flex gap-2 cursor-pointer'})}
                >
                  <input 
                    {...getInputProps()}
                  />
                   <FilePlus2 />
                   <span>Insert new document</span>   
                </div>

                <p>MY ID: {data.id}</p>
          </div>   
        </div>  
  </div>

  {/**FOR SMALLER SCREENS */}
  <div className='flex w-full  relative mb-2 justify-between py-4 px-2 md:hidden  items-center gap-4'>
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
           className={`md:hidden block ${chatClick && !menuClick? 'invisible' : 'visible'}`} 
         />

       <motion.div  
          animate={menuClick ? "clicked" : 'notclicked'}
          variants={menuVariants}
          transition={{ type: "tween", delay: 0.1, ease: 'backInOut'}}
          className={`w-[220px] rounded-lg absolute top-0 border bg-white z-50 h-[680px]`}>
           <X 
             className='absolute right-2 top-2'
             size={24}
             onClick={handleMenuClick}
            />

             {/**DOCUMENT NAME */}
      <div className='mt-[45px] mx-2'>
         <div className='flex gap-2 items-center'>
             <p className='text-[18px]'>{data.name}</p>
              <Pencil 
                color='black'
                size={18}
              />
         </div>
      </div>

          <div className='mt-[160px] h-auto w-full px-2'>
               {/**OPTIONS AVAILABLE */}
           <div className=' flex flex-col gap-4'>
                <Link className='flex gap-2' href={'/archives'}>
                  <FolderClosed />
                   <span>My Archive</span>
                </Link>

                <div 
                 {...getRootProps({className: 'flex gap-2 cursor-pointer'})}
                >
                  <input 
                    {...getInputProps()}
                  />
                   <FilePlus2 />
                   <span>Insert new document</span>   
                </div>
                {/**HIDDEN INPUT TO OPEN FILE EXPLORER WHEN CLICKING THIS */}
                              
          </div>   
            </div>
       </motion.div>

       <motion.div
          className={`w-[250px] absolute  ${chatClick && !menuClick? 'right-0' : 'right-[-400px]'} duration-200 ease-linear top-0 border bg-white rounded-lg z-50 h-[680px]`}>
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
      <div className='border-[#C0BCD1]  px-2 md:px-[35px] overflow-y-auto border mx-auto md:w-[850px] min-w-[360px] sm:w-[600px] max-w-[760px] h-[500px] md:h-screen '>
          <div className='w-full  h-full'>
             {/**MAP THE DOCUMENTS HERE   */}
            {data.file_link ? <DocumentFile selectedFile={data.file_link}/> : <p className='text-center m-auto'>Empty Document</p>}   
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