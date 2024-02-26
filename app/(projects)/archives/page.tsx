/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Link from 'next/link'
import React, { ChangeEvent, FormEvent,useEffect,useState } from 'react'
import { Inbox, Loader2, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import Archive from '@/components/archive'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'


import { Button } from "@/components/ui/button"
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
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/components/ui/use-toast'
import { useEdgeStore } from '@/lib/edgestore'

 
type documentType = {
  userId: string | null | undefined,
  name: string,
  number_of_documents: number,
  number_of_questions: number,
  file: globalThis.File[],
  url: string,
}


export default function archives() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn, user, } = useUser();
    const { userId } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const randomUUID = crypto.randomUUID().toString();
    const [uploading, setUploading ] = useState<boolean>(false);
    const { edgestore } = useEdgeStore();
    const [progressBar, setProgressBar] = useState<number>(0);
    const [ existedFile, setExistedFile ] = useState<boolean>(false);
    const [ filename, setFileName ] = useState<string>('');

    const [data, setData] = useState<documentType>({
      userId: userId as string,
      name: '',
      number_of_documents: 0,
      number_of_questions: 0,
      file: [],
      url: ''
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

   
    const {getRootProps, getInputProps } = useDropzone({
      accept: {
        'application/pdf': ['.pdf']
      },
      maxFiles: 1,
      onDrop: async (acceptedFiles) => {   
        const file = acceptedFiles[0]
        setData(prev => ({
          ...prev,
          file: [file]
        }))

        if (file.size > 10 * 1024 * 1024) {
          // bigger than 10mb!
          alert('File is too large, minimum of 10mb');
          return;
        }
        try {
          if (!file) {
            console.log("Something went wrong");
            return;
          }
          setUploading(true);
          //const data = await uploadToS3(file);
          console.log("meow", data);


        {/**EDGESTORE */}
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              console.log(progress);
              setProgressBar(progress);
            },
          }) 
          setExistedFile(true)
          setFileName(file.name);

          setData(prev => ({
            ...prev,
            url: res.url,
          }))

          console.log('RES:', res);
          console.log('DATA URL', data.url);

        } catch (error) {
          console.log(error);
        } finally {
          setUploading(false);
        }
      },
      }
   )
   
  
     // Update data state when userId changes
  useEffect(() => {
    if (userId) {
      setData(prev => ({
        ...prev,
        userId: userId
      }));
    }
  }, [userId]);
    
  console.log(data);
  
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
             toast({title: "Successful", content: "added document to the database"})
             router.push(`/main/${result.data.id}`)
             console.log('RESULT FROM MUTATION', result.data)
           },
           onError: (err) => {
              toast({title: "Error", content: err.message})
           }
         })
      }
      catch(error) {
        console.log(error);
      }
  }

   function handleDataValue(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target
      setData(prev => ({
        ...prev,
        [name]: value
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="number" className="text-right">
                          Number of document
                        </Label>
                        <Input
                          id="number_of_documents"
                          value={Number(data?.number_of_documents)}
                          onChange={handleDataValue}
                          name="number_of_documents"
                          className="col-span-3"
                          type="number "
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="questions" className="text-right">
                          Number of questions
                        </Label>
                        <Input
                          id="questions"
                          value={Number(data?.number_of_questions)}
                          onChange={handleDataValue}
                          name="number_of_questions"
                          className="col-span-3"
                          type="number"
                        />
                      </div>

                   {/** DROP ZONE FILES**/}
                      <div className="p-2 bg-white rounded-xl">
                        <div
                          {...getRootProps({
                            className:
                              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                          })}
                        >
                          <input {...getInputProps()} />

                          { filename ? (
                            <div className='flex items-center gap-6 '>
                               <p className='mt-2 text-sm text-slate-400'>
                                  {filename}
                               </p>

                               <Trash 
                                  className='text-slate-400' size={18}
                                  onClick={ async () => setFileName('')}
                                />
                            </div>
                          )
                            
                          : uploading ? (
                            <>
                              {/* loading state */}
                              <Loader2 className="h-10 w-10 text-violet-500 animate-spin" />
                              <p className="mt-2 text-sm text-slate-400">
                                 Loading
                              </p>

                               <div className='h-[6px] w-44 border rounded overflow-hidden'>
                                  <div
                                   className='h-full bg-primaryColor transition-all duration-200'
                                   style={{
                                     width: `${progressBar}%`
                                   }}
                                  />
                              </div>
                            </>
                          ) : (
                            <>
                              <Inbox className="w-10 h-10 text-violet-500" />
                              <p className="mt-2 text-sm text-slate-400">
                                Insert Document Here
                              </p>
                            </>
                          )}

                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      {/**AFTER SUBMITTING THE FORM THEN GO TO THE MAIN PAGE WITH
                       * THE DETAILS ENTERED BY THE USER */}
                      <Button
                        type="submit"
                        className="bg-primaryColor
                    hover:bg-violet-400 duration-200 ease-in-out"
                      >
                        Save Changes
                      </Button>
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
