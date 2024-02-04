'use client'

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter } from "next/navigation";



const LinkButton = ({ href, variant, text }: { href: string, variant: string | any, text: string }) => {
    return  (
     <Link href={href}>
       <Button variant={variant} className="text-white font-medium sm:text-[18px] md:text-[22px]">
          {text}
       </Button>
    </Link>
    )
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();

  return (
    <nav
      className={`w-full flex py-2 justify-between items-center ${
        pathname?.includes("/login") ||
        pathname?.includes("/register")
          ? "hidden"
          : "flex"
      }`}
    >
      <Link href={"/"} className="text-white">LOGO</Link>

      

    <div className="flex">
      {/**USER ALREADY LOGGED IN */}
        <SignedIn>
          <Link href={"/login"}>
            <Button variant={"link"} className="text-white">About</Button>
          </Link>

          <Link href={"/register"}>
            <Button
              variant={"destructive"}
              className="text-white"
              onClick={() => signOut(() => router.push("/"))}
            >
              Logout
            </Button>
          </Link>
        </SignedIn>


        {/* User not authenticated */}
        <SignedOut>
           <div className="hidden sm:block">
              <LinkButton href={"/login"} text="Log in" variant={'link'}/>
              <LinkButton href={"/register"} text="Sign up" variant={'link'}/>
           </div>
          
        
           <Popover>
                 <PopoverTrigger className="block sm:hidden">
                   <Menu 
                     color="#ffff"
                     size={32}
                   />
                 </PopoverTrigger>

                 <PopoverContent className="bg-[#373363] flex flex-col gap-2 w-fit h-auto py-4">
                   <LinkButton href={"/login"} text="Log in" variant={'link'}/>
         
                   <LinkButton href={"/register"} text="Sign up" variant={'link'}/>
                 </PopoverContent>
            </Popover>

        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
