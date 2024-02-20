import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const LinkButton = ({
  href,
  variant,
  text,
  className,
}: {
  href: string;
  variant: string | any;
  text: string;
  className?: string;
}) => {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        className={`text-white font-medium sm:text-[16px] md:text-[20px] ${className}`}
      >
        {text}
      </Button>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <nav className="w-full text-white top-0 z-10 flex py-2 justify-between items-center">
      <div>
        <Link href={"/"}>
          <Image width={45} height={45} alt={"Logo"} src={"/Logo white.png"} 
           className="w-[40px] h-auto md:w-auto"
          />
        </Link>
      </div>

      <div className="flex">
        {/**USER ALREADY LOGGED IN */}
        <SignedIn>
          {router.pathname.includes("/about") ? (
            <LinkButton 
            variant={"link"} 
            href={"/"} text="Home"  
            className="font-light text-[16px] md:text-[18px]"/>
          ) : (
            <LinkButton
              variant={"link"}
              href={"/about"}
              text="About"
              className="font-light text-[16px] md:text-[18px]"
            />
          )}

          <Link href={"/register"}>
            <Button
              variant={"destructive"}
              className="text-white px-3 py-1"
              onClick={() => signOut(() => router.push("/"))}
            >
              Logout
            </Button>
          </Link>
        </SignedIn>

        {/* User not authenticated */}
        <SignedOut>
          <div className="hidden text-white sm:block">
            {router.pathname.includes("/about") ? (
              <LinkButton
                variant={"link"}
                href={"/"}
                text="Home"
                className="font-light text-[16px] md:text-[18px]"
              />
            ) : (
              <LinkButton
                variant={"link"}
                href={"/about"}
                text="About"
                className="font-light text-[16px] md:text-[18px]"
              />
            )}
            <LinkButton 
             className="font-light text-[16px] md:text-[18px]"
             href={"/login"} 
             text="Log in" 
             variant={"link"} />
          </div>

{/**FOR SMALLER SCREEN VIEW */}
          <Popover>
            <PopoverTrigger className="block sm:hidden">
              <Menu color="#ffff" size={32} />
            </PopoverTrigger>

            <PopoverContent className="bg-[#373363] flex flex-col gap-2 w-fit h-auto py-4">
              <LinkButton 
                href={"/login"} 
                text="Log in"  
                variant={"link"}      
                />
              <LinkButton href={"/register"} text="Sign up" variant={"link"} />
            </PopoverContent>
          </Popover>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
