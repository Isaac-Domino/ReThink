'use client'

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter} from "next/navigation";
import { signIn, signOut, useSession,  } from "next-auth/react";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



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
  const { data: session } = useSession();

  return (
    <nav
      
    >
      <Link href={"/"} className="text-white">LOGO</Link>

    
    <div className="flex">
      {/**USER ALREADY LOGGED IN */} 
    {session?.user ?
       <>
          <Link href={"/login"}>
            <Button variant={"link"} className="text-white">About</Button>
          </Link>

          <Link href={"/register"}>
            <Button
              variant={"destructive"}
              className="text-white"
              onClick={()  => signOut()}
            >
              Logout
            </Button>
          </Link>
        </>  
        :  
    <> 
      <div className="hidden sm:block">
           <button type="button" onClick={() => signIn()}>Login</button>
           <button type="button" onClick={() => signIn()}>Signup</button>
      </div>


     <Popover>
       <PopoverTrigger className="block sm:hidden">
         <Menu 
           color="#ffff"
           size={32}
         />
       </PopoverTrigger>

       <PopoverContent className="bg-[#373363] flex flex-col gap-2 w-fit h-auto py-4">
           <button type="button" onClick={() => signIn()}>Login</button>
           <button type="button" onClick={() => signIn()}>Signup</button>
       </PopoverContent>
     </Popover>
    </> 
  } 
      </div>
    </nav>
  );
};

export default Navbar;
