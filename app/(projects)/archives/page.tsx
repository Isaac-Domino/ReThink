/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Link from 'next/link'
import React, { ChangeEvent, FormEvent,useEffect,useState } from 'react'
import { Inbox, Loader2, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import Archive from '@/components/archive'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'
import { toast } from 'sonner';

import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useRouter } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'


import { UploadButton, UploadDropzone } from "@/lib/uploadthing"; 
import "@uploadthing/react/styles.css";

type documentType = {
  userId: string | null | undefined,
  name: string,
  file: globalThis.File[],
  url: string,
  file_key: string
}


export function formatURLparams(url: string ) { 
   const lastIndex = url?.substring(0, url.lastIndexOf('.'));
   return lastIndex;
}

export default function archives() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn, user, } = useUser();
    const { userId } = useAuth();
    const router = useRouter();
    const [uploading, setUploading ] = useState<boolean>(false);
    const [data, setData] = useState<documentType>({
      userId: userId as string,
      name: '',
      file: [],
      url: '',
      file_key: ''
   })

    const { mutate, isPending } = useMutation({
      mutationFn: async (item: documentType) => axios.post('/api/sample', item),
      onError: (err) => {
        console.log(err.message);
      },
      
      onSuccess: () => {
       console.log('Success');
      }
   })

  useEffect(() => {
    if (userId) {
      setData(prev => ({
        ...prev,
        userId: userId
      }));
    }
  }, [userId]);
    
  console.log('DATA: ', data)
  
   async function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault(); 
      console.log("submitted: ", data)

       try {
           setUploading(true);
            console.log("meow", data);
            if (!data) {
              console.log("Something went wrong");
              return;
            }
            
         mutate(data, {
           onSuccess: (result) => { 
             
             router.push(`/main/${result.data.id}`)
             console.log('RESULT FROM MUTATION', result.data)
           },
           onError: (err) => {
              console.log(err)
           }
         })
      }
      catch(error) {
        console.log(error);
      }
  }

   function handleDataValue(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target
      const formattedValue = value.replace(/[^a-zA-Z_\-]/g, '');  //empty string on numbers and other characters that are not hypens and underscores
      setData(prev => ({
        ...prev,
        [name]: formattedValue
      }))
   }
 
  return (
    <div className="px-5 md:px-[55px] w-full py-4 md:py-[24px]">
      <nav className="flex justify-between items-center">
        <Image width={50} height={50} src={"/Logo.png"} alt={"Logo"} />

        {/**USER AUTHENTICATION */}
        <ul className="flex gap-4 items-center">
          <li className="font-medium text-[18px] md:text-[22px] text-primaryColor">
            <Link href={"/"}>Home</Link>
          </li>

          {isSignedIn || user ? (
            <UserButton />
          ) : (
            <button className="bg-gradient-to-r from-violet-900 to-purple-500 hover:bg-violet-600 text-white px-3 rounded-sm py-2 ">
              <Link href={"/login"}>Login</Link>
            </button>
          )}
        </ul>
      </nav>

      {/**ARCHIVES */}
      <div className="border-gray-20 shadow-lg border-[1px] rounded-md relative w-full min-h-screen mt-[50px] md:mt-[90px] mx-auto">
        <div className="flex w-auto mt-[50px] mx-[10px] my-[15px] p-2 md:p-6 gap-8 items-start flex-col">
          <h3 className="self-center sm:text-[25px] md:text-[27px]">
            Your archives
          </h3>

          {/**ARCHIVES */}
          <div className="w-full h-auto">
            <div className="flex items-start gap-8 flex-col">
              <Dialog>
                <DialogTrigger asChild>
                  {/**CREATE BUTTON HERE */}
                  <div className="flex flex-col gap-2">
                    <button
                      disabled={!isSignedIn || !user}
                      className={`${
                        !isSignedIn || !user
                          ? "bg-gray-500"
                          : "bg-[#4B3F94] hover:bg-violet-700"
                      } text-center w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] duration-200 ease-in-out text-white rounded-md text-[18px]`}
                      type="button"
                    >
                      <Plus size={32} className="m-auto" />
                    </button>
                    <span className="text-[#55545E] font-medium ">
                      Create new
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">

                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Create new document</DialogTitle>
                      <DialogDescription>
                        Make changes to your new work here. Click save when
                        youre done.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name of your work
                        </Label>
                        <Input
                          id="name"
                          value={data?.name}
                          onChange={handleDataValue}
                          name="name"
                          className="col-span-3"
                        />             
                      </div>
                      {data.name.length < 6 && <p className='w-full text-center font-light text-[12px] text-red-500'>The length of document must be 6 characters long and with no special characters or numbers</p>}
              
                      {/** DROP ZONE FILES**/}
                      <div className="p-2 bg-white rounded-xl">
                        <div>
                          {data.name.length >= 6  && 
                          <UploadDropzone
                            endpoint="documentUploader"
                          
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("File key: ", res[0].key);
                              
                              toast.loading("Please wait....")
                              mutate({
                                ...data, // Preserve other properties from the current state
                                url: res[0].url,
                                file_key: res[0].key
                              }, 
                                
                              {
                                onSuccess: (result) => { 
                                  toast.success("Successful")
                                  router.push(`/main/${formatURLparams(res[0].key)}`)
                                  console.log('RESULT FROM MUTATION', result.data)
                                },
                                onError: (err) => {
                                   toast.error("Error "+ err.message);
                                },
                              })
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              toast.error(`ERROR! ${error.message}`);
                            }}  
                            
                          /> }
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <p className='text-center w-full text-gray-400 font-medium text-[12px]'>Upload the document to proceed</p>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/**ARCHIVES LISTS */}
              {isSignedIn || user ? (
                <div className="border scroll-auto w-auto min-w-full max-w-[1180px] min-h-[700px]">
                  {/**archive items */}
                  <div className="h-auto w-fit min-w-max">
                    {/**START MAPPING ITEMS HERE */}
                    <Archive />
                  </div>
                </div>
              ) : (
                <p className="self-center mx-auto mt-[70px] text-[18px] font-normal text-[#A09EA8]">
                  Log in to continue
                </p>
              )}
            </div>
          </div>
        </div>

        {/**PROPS IMAGES */}
        <Image
          src={"/book.svg"}
          alt="book avatar"
          width={100}
          height={50}
          quality={100}
          className="absolute top-1 right-2 w-[50px] md:w-auto"
        />

        <Image
          src={"/woman-with-book.svg"}
          alt="book avatar"
          width={100}
          height={100}
          quality={100}
          sizes="100vw"
          className="absolute left-2 bottom-0 w-[70px] md:w-auto"
        />
      </div>
    </div>
  );
}
