"use client"

import Link from "next/link";
import React, { useState } from "react";
import {  usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Copy, FacebookIcon, InstagramIcon, MailIcon, Phone } from "lucide-react";
import { useToast } from "./ui/use-toast";
import HowToUse from "./howToUse";
import TermsAndCondition from "./terms_and_condition";
import Disclaimer from "./disclaimer";




export default function Footer() {
  const pathname= usePathname();

  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('+639606810484');
      setCopySuccess(true);
     
      if(copySuccess) {
        toast({ 
          title: 'Copied',
          variant: 'default'
         })
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopySuccess(false);
    }
  };
  return (
    <main
      className={`w-full min-w-full relative bottom-0 bg-[#24202b] text-gray-400 text-xs md:text-[18px] py-8 px-2 md:px-12  ${
        pathname.includes("/login") ||
        pathname.includes("/register") ||
        pathname.includes("/main")
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="w-full flex flex-col gap-4 sm:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-4 md:gap-[35px] items-center md:items-start">
          <div className="flex flex-row items-center gap-2">
            <Link href={"/"} className="flex gap-2">
              <InstagramIcon
                className="border hover:bg-white hover:text-gray-600 transition-colors duration-150 border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=61556625899850"}
              className="flex gap-2"
            >
              <FacebookIcon
                className="border hover:bg-white hover:text-gray-600 transition-colors duration-150 border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>

            <Link href={"/"} className="flex gap-2 ">
              <MailIcon
                className="border hover:bg-white hover:text-gray-600 transition-colors duration-150 border-gray-400 p-1 rounded-full"
                size={30}
                
              />
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Phone
                  className="border hover:bg-white hover:text-gray-600 transition-colors duration-150 cursor-pointer border-gray-400 p-1  rounded-full"
                  size={30}
                  
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>CONTACT US</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex justify-between items-center gap-2 ">
                      <span className="font-medium text-[16px]">
                        +639606810484
                      </span>

                      <Button
                        variant={"outline"}
                        className="self-center "
                        onClick={copyToClipboard}
                      >
                        <Copy className="" />
                      </Button>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {/** <span>+639606810484</span> */}
          </div>
        </div>

        <div className="flex justify-evenly md:justify-center items-center flex-col md:flex-row ">
          <div className="flex flex-row items-center text-white">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="text-gray-400 ">
                  Disclaimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>DISCLAIMER</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Disclaimer />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" className="text-gray-400 ">
                  Terms and Condition
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>TERMS AND CONDITION</AlertDialogTitle>
                  <div className="h-[500px] md:h-[600px] overflow-y-auto">
                    <AlertDialogDescription>
                        <TermsAndCondition />
                    </AlertDialogDescription>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="items-center ">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="link" className="text-gray-400 ">
                    How to Use
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>How to use</AlertDialogTitle>
                    <div className="h-[500px] md:h-[600px] overflow-y-auto">
                      <AlertDialogDescription>
                         <HowToUse />
                      </AlertDialogDescription>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Exit</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="mx-auto sm:mx-0">
          <span className="text-sm">Copyright © 2024 ReThink</span>
        </div>
      </div>
    </main>
  );
};

