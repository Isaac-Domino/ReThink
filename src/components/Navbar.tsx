import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <nav
      className={`max-w-5xl h-24 w-full mx-auto flex justify-between items-center ${
        router.pathname.includes("/login") ||
        router.pathname.includes("/register")
          ? "hidden"
          : "flex"
      }`}
    >
      <Link href={"/"}>LOGO</Link>
      <div>
        <SignedIn>
          <Link href={"/login"}>
            <Button variant={"link"}>About</Button>
          </Link>
          <Link href={"/register"}>
            <Button
              variant={"destructive"}
              onClick={() => signOut(() => router.push("/"))}
            >
              Logout
            </Button>
          </Link>
        </SignedIn>
        {/* OPPOSITE 'TO */}
        <SignedOut>
          <Link href={"/login"}>
            <Button variant={"link"}>Login</Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"default"}>Register</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
