/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Link from 'next/link'
import React, { ChangeEvent,  useState } from 'react'
import { Plus  } from 'lucide-react'
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
import {  useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"; 
import "@uploadthing/react/styles.css";
import { dark } from '@clerk/themes'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

type documentType = {
  userId: string | null | undefined,
  name: string,
  file: globalThis.File[],
  url: string,
  file_key: string
}

export default function Projects() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn, user, } = useUser();
    const [ uploading, setUploading] = useState<boolean>(false); 
    const { userId } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<documentType>({
      userId: userId as string,
      name: '',
      file: [],
      url: '',
      file_key: ''
   })

    const { mutate, isPending, isSuccess } = useMutation({
      mutationFn: async (items: documentType) => axios.post('/api/store-data', items),
      onError: (err) => {
        console.log(err.message);
      },
      onSuccess: () => {
       console.log('Successful Please wait...');
      }
   })

 /* useEffect(() => {
    if (userId) {
      setData(prev => ({
        ...prev,
        userId: userId
      }));
    }
  }, [userId]); */
    
   function handleDataValue(e: ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target
      const formattedValue = value.replace(/[^a-zA-Z_\-]/g, '');  //empty string on numbers and other characters that are not hypens and underscores
      setData(prev => ({
        ...prev,
        [name]: formattedValue,
        userId: userId
      }))
   }
 
  return (
    <div className="px-5 md:px-[55px] w-full min-h-full py-4 md:py-[24px]">
      <nav className="flex justify-between px-2 md:px-8 items-center">
        <Link href={"/"}>
          <Image width={35} height={35} src={"/Logo.png"} alt={"Logo"} />
        </Link>

        {/**USER AUTHENTICATION */}
        <ul className="flex gap-4 items-center">
          <li className="font-medium text-[18px] md:text-[20px] text-[#7f5fad]">
            <Link href={"/"}>Home</Link>
          </li>

          {isSignedIn || user ? (
            <UserButton 
              afterSignOutUrl="/projects"
              appearance={{
                baseTheme: dark,  
              }}
              
            />
          ) : (
            <Button
              variant={"default"}
              className="bg-gradient-to-r hover:opacity-80 duration-150 ease-in-out from-violet-500 to-purple-500 hover:bg-violet-600 text-white px-3 rounded-sm py-2 "
            >
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </ul>
      </nav>

      {/**ARCHIVES */}
      <div className="border-gray-20 
               max-w-[1100px] shadow-lg border-[1px] rounded-md relative w-full mt-[30px] 
               min-h-[750px] max-h-screen md:mt-[50px] mx-auto">
        <div className="flex w-auto mt-[30px] mx-[10px] p-2 md:p-6 gap-4 items-start flex-col">
          <h3 className="self-center text-[18px] sm:text-[25px] md:text-[27px] text-[#5e5c69]">
            Your Projects
          </h3>

          {/**ARCHIVES */}
          <div className="w-full h-auto ">
            <div className="flex items-start gap-2 flex-col">
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
                      } text-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] duration-200 ease-in-out text-white rounded-md text-[18px]`}
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

                  <form >
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
                          value={data.name}
                          onChange={handleDataValue}
                          name="name"
                          className="col-span-3"
                          disabled={uploading || isSuccess}  
                        />             
                      </div>
                    {data.name.length < 6 && <p 
                    className='w-full text-center font-medium text-[12px] text-red-500'>The length of document name must be 6 
                    characters long with no special characters or numbers</p>}


                      {/** DROP ZONE FILES**/}
                      <div className="p-2 bg-white rounded-xl">
                        <div>
                          {data.name.length >= 6  && 
                          <UploadDropzone
                            endpoint="documentUploader"
                            content={{
                              allowedContent: "Maximum file size is 32mb",
                            }}
                            onUploadProgress={() => {
                              setUploading(true)    
                            }}
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              //console.log("File key: ", res[0].key);     
                              setUploading(false)           
                              mutate({
                                ...data, // Preserve other properties from the current state
                                url: res[0].url,
                                file_key: res[0].key
                              }, 
                              {
                                onSuccess: (result) => {  //result from the Response api
                                  toast.success("Successful")
                                  router.push(`/main/${result.data}`)
                                  console.log("result: ", result)
                                },
                                onError: (err) => {
                                   toast.error("Error "+ err.message);
                                },
                              })
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(`ERROR! ${error.message}`);
                            }}  
                            
                          /> }
                         </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <p className='text-center w-full text-gray-400 font-medium text-[12px]'>Upload document (pdf) to proceed</p>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/**ARCHIVES LISTS */}
              {isSignedIn || user ? (
                <div className="overflow-y-clip w-full max-w-full">
                  {/**archive items */}
                  <div className="max-h-[550px] overflow-y-auto w-full min-w-full">
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
          width={90}
          height={50}
          quality={100}
          className="absolute top-1 right-2 w-[50px] md:w-auto"
        />

        <Image
          src={"/woman-with-book.svg"}
          alt="book avatar"
          width={90}
          height={100}
          quality={100}
          sizes="100vw"
          className="absolute left-2 bottom-0 "
        />
      </div>
    </div>
  );
}
