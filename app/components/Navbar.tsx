import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { dark, neobrutalism } from '@clerk/themes'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";


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
  return (
    <nav className="w-full text-white top-0 z-10 flex py-2 justify-between items-center">
      <div>
        <Link href={"/"}>
          <Image
            width={30}
            height={30}
            alt={"Logo"}
            src={"/Logo white.png"}
            className=""
          />
        </Link>
      </div>

      <div className="flex">
        {/**USER ALREADY LOGGED IN */}
        <SignedIn>
          <div className="flex gap-4 items-center justify-between">
            <UserButton 
                 afterSignOutUrl="/" 
                 appearance={{
                  variables: {
                    colorPrimary: "#166792",
                    colorDanger: "red",
                    fontSmoothing: "antialiased",
                    colorSuccess: "green",
                  },
                  baseTheme: dark,

                }}
                showName={true}
            />
          </div>
        </SignedIn>

        {/* User not authenticated */}
        <SignedOut>
          <div className="hidden text-white sm:block">
            <LinkButton
              className="font-normal text-[16px] md:text-[18px]"
              href={"/login"}
              text="Log in"
              variant={"link"}
            />
          </div>

          {/**FOR SMALLER SCREEN VIEW */}
          <Popover>
            <PopoverTrigger className="block sm:hidden">
              <Menu color="#ffff" size={32} />
            </PopoverTrigger>

            <PopoverContent className="bg-[#373363] flex flex-col gap-2 w-fit h-auto py-4">
              <LinkButton href={"/login"} text="Log in" variant={"link"} />
              <LinkButton href={"/register"} text="Sign up" variant={"link"} />
            </PopoverContent>
          </Popover>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;