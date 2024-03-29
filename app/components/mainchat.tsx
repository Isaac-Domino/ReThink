"use client"

import NavbarMain from '@/components/navbar-main'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Pencil, FolderClosed, X, Check } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from "framer-motion"
import DocumentFile from './documentViewer'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { savedDataDbType } from '../../types'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'
import Chats from './chats'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ChatMobile from './chatMobile'
import '@/styles/main.css'

const menuVariants = {
  clicked: { opacity: 1, x: -6, },
  notclicked: { opacity: 0, x: "-100%",}
}

export default function Main({ data }: { data: savedDataDbType}) {
  const [menuClick, setMenuClick] = useState<boolean>(false);
  const [chatClick, setChatClick] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

 //FOR UPDATING NAME
  const {mutate, isPending } = useMutation({
    mutationFn: async ({ item, id }: { item: string, id: string}) => axios.post('/api/changename', { item, id }),
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  function handleMenuClick() {
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
        router.refresh();
      },
      onError: (err) => {
        toast.error("Error updating document name: "+err.message);
      }
    })
  }

  function formatName (e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const formattedValue = value.replace(/[^a-zA-Z_\-]/g, '');
    setNewName(formattedValue);
  } 


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full min-h-screen min-w-full h-screen overflow-x-hidden overflow-y-hidden ">
      <NavbarMain />
      <main id='maincontainer' className="min-w-min w-full h-[700px] sm:h-full">
        {/**SIDEBAR */}
        <div id='sidebar' className="border w-full px-4 py-4 block h-full">
          {/**NAME OF THE DOCUMENT */}
          <div id='sidebar-content' className="py-3">
            {!editing ? (
              <div className="flex text-gray-700 gap-1 w-full max-w-full items-center cursor-pointer">
                <p className="text-[16px] break-words md:text-[18px] max-w-full w-fit">{data.name}</p>
                <Pencil
                  size={20}
                  className='text-[16px] md:text-[18px]'
                  onClick={() => setEditing(true)}
                />
              </div>
            ) : (
              <AnimatePresence>
              <motion.form
                initial={{ width: 0 }}
                animate={{ width: '100%'}}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleChangeName}
                className="flex gap-2 items-center max-w-full  cursor-pointer"
              >
                <input
                  type="text"
                  placeholder={data.name}
                  value={newName}
                  onChange={formatName}
                  ref={inputRef}
                  className="bg-transparent border-1 rounded-xl outline-none border-purple-500 py-1 indent-2 border md:w-full w-[150px]"
                />

                <div className="flex gap-1 items-center">
                  <button
                    type="submit"
                    onSubmit={handleChangeName}
                    className="p-1 bg-blue-500 rounded-full"
                  >
                    <Check size={18} className="text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="p-1 bg-red-500 rounded-full"
                  >
                    <X size={18} className=" text-white" />
                  </button>
                </div>
               </motion.form>
              </AnimatePresence>
            )}

            {/**OPTIONS AVAILABLE */}
            <div className="text-gray-700  min-w-[150px] items-center flex flex-col gap-1">
              <Link className="flex items-center gap-2" href={"/projects"}>
                <FolderClosed size={22} className='text-[16px] md:text-[20px]'/>
                <span className='text-[16px] md:text-[18px]'>My Projects</span>
              </Link>
            </div>
          </div>
        </div>

        {/**DOCUMENT FILE */}
        <div className="px-2 md:px-[15px] overflow-y-auto border mx-auto w-full
          md:w-[600px] lg:w-[640px] xl:w-[700px] max-w-[720px] min-h-full h-full max-h-full">
          {/**MAP THE DOCUMENTS HERE */}
          <DocumentFile selectedFile={data.file_link} />
        </div>

        {/**FOR MOBILE DISPLAY CHAT */}
        <div className="bottom-5 lg:hidden fixed right-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className={`w-16 ${isOpen ? 'hidden' : 'block'} h-16 bg-white text-white
                  rounded-full flex items-center justify-center 
                  border-violet-500 border hover:bg-violet-500 focus:outline-none`}
          >
            <Image
              src={"/chat-icon.svg"}
              alt="chat icon"
              width={50}
              height={50}
            />
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ width: 0, height: 0 }}
                animate={{ width: 280, height: 550 }}
                exit={{ width: 0, height: 0 }}
                className="bg-[#f8f6fa] rounded-lg flex flex-col justify-between lg:hidden
                   shadow-lg border border-[#C0BCD1] absolute 
                  bottom-0 right-0 z-20 h-full overflow-hidden"
              >
                <div className="flex h-[60px] justify-between items-center px-4 py-2 bg-violet-500 text-white">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.972 5.972 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.48 2.091 14.487 2.091 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>
                    <span className="text-lg">Chat</span>
                  </div>
                  <button
                    onClick={toggleChat}
                    className="text-white hover:text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Add your chat messages or components here */}          
                   <ChatMobile fileKey={data?.file_key} id={data?.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/**CHAT BOX */}
        <div className="border-[#C0BCD1] bg-[#f8f6fa] hidden lg:flex flex-col border w-[490px] h-full min-h-full">
          {/**TOP */}
          <div className="flex gap-2 text-primaryColor w-auto z-50  items-center m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.972 5.972 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.48 2.091 14.487 2.091 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span className="text-[20px]">Chat</span>
          </div>

          {/**CHAT COMPLETION  */}
              <Chats fileKey={data?.file_key} id={data?.id} />
        </div>
      </main>
    </div>
  );
}