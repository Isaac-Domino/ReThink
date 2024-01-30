import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Poppins } from 'next/font/google'
import { Menu } from "lucide-react";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

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
  const { signOut } = useClerk();

  return (
    <nav
      className={`w-full flex py-2 justify-between items-center ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register")
          ? "hidden"
          : "flex"
      }`}
    >
      <Link href={"/"} className="text-white">LOGO</Link>

      {/**MENU FOR MOBILE PHONE */}
      <Menu className="md:hidden block" color="white"/>

      <div className="hidden md:flex">
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
          <LinkButton href={"/login"} text="Log in" variant={'link'}/>
         
          <LinkButton href={"/login"} text="Sign up" variant={'link'}/>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
